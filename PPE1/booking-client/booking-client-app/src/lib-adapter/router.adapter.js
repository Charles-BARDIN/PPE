export default class Router {
  constructor() {}
  go(state) {
    if(this._modalOpened) {
      if(!this._closeModal) {
        throw new Error('A closeModal method must be provided');
      }

      this._modalOpened = false;
      this._closeModal();
    }


    if(['login', 'logout'].indexOf(state) < 0) {
      this._goToState(state);
    } else {
      if(!this._openModal) {
        throw new Error('An openModal method must be provided for state', state);
      }
      this._modalOpened = true;
      this._openModal(state);
    }
  }
  
  _goToState(state) {
    this._vueRouter.push(state);
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