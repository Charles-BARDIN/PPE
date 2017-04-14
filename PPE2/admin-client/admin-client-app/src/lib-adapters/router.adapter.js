export default class Router {
  constructor() { }
  go(state, parameter) {
    if (this._modalOpened) {
      if (!this._closeModal) {
        throw new Error('A closeModal method must be provided');
      }

      this._modalOpened = false;
      this._closeModal();
    }

    this.parameter = parameter;

    if (['logout', 'delete-room', 'cancel-booking'].indexOf(state) < 0) {
      if (state === 'edit-room') {
        this._goToState({ path: `/rooms/${parameter.id}` });
        return;
      }
      this._goToState({ name: state });
      return;
    }

    if (!this._openModal) {
      throw new Error('An openModal method must be provided for state', state);
    }
    this._modalOpened = true;
    this._openModal(state);
  }

  _goToState(state) {
    this._vueRouter.push(state);
  }

  getRouteParameters() {
    return this.parameter;
  }

  set openModal(fn) {
    this._openModal = fn;
  }

  set closeModal(fn) {
    this._closeModal = fn;
  }

  set vueRouter(router) {
    this._vueRouter = router;
  }
}
