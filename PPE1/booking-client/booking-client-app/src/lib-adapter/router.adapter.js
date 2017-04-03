export default class Router {
  constructor() {}
  go(state) {
    if(['login', 'logout'].indexOf(state) < 0) {
      this._goToState(state);
    } else {
      if(!this._openModal) {
        throw new Error('An openModal method must be provided for state', state);
      }
      this._openModal(state);
    }
  }
  
  _goToState(state) {
    this._vueRouter.push(state);
  }

  set openModal(fn) {
    this._openModal = fn;
  }

  set vueRouter(router) {
    this._vueRouter = router;
  }
}