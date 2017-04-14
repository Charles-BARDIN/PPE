import adminClientLib from '@/lib-adapters'

import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Booking from '@/components/Booking'
import NewRoom from '@/components/NewRoom'
import EditRoom from '@/components/EditRoom'
import Room from '@/components/Room'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/bookings',
          name: 'bookings',
          component: Booking
        },
        {
          path: '/rooms/:id',
          name: 'edit-room',
          component: EditRoom
        },
        {
          path: '/rooms',
          name: 'rooms',
          component: Room
        },
        {
          path: '/rooms/new',
          name: 'new-room',
          component: NewRoom
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.name === 'main') {
    let stateToGo = adminClientLib.authService.userIsConnected() ? 'rooms' : 'login';
    next(stateToGo);
  }
  if (to.name != null) {
    next(true);
    return;
  }

  next('/login');
});

adminClientLib.router.vueRouter = router;

export default router;
