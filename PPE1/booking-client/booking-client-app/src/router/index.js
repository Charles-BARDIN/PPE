import Vue from 'vue'
import bookingClientLib from '@/lib-adapter'

import Router from 'vue-router'
import Index from '@/components/Index'
import Register from '@/components/Register'
import Profile from '@/components/Profile'
import Booking from '@/components/Booking'
import Room from '@/components/Room'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/profil',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/booking',
      name: 'Booking',
      component: Booking
    },
    {
      path: '/room',
      name: 'Room',
      component: Room
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.name != null) {
    next(true);
    return;
  }

  next('/');
});

bookingClientLib.getRouter().vueRouter = router;

export default router;
