import vueRouter from '../router';

export default {
  go(state) {
    vueRouter.push(state);
  }
};