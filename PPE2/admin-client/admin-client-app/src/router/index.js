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
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/booking',
          name: 'booking',
          component: Booking
        },
        {
          path: '/edit-room',
          name: 'Edit Room',
          component: EditRoom
        },
        {
          path: '/rooms',
          name: 'rooms',
          component: Room
        },
        {
          path: '/new-room',
          name: 'New Room',
          component: NewRoom
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.name != null) {
    next(true);
    return;
  }

  next('/login');
});

adminClientLib.router.vueRouter = router;

export default router;
