import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Booking from '@/components/Booking'
import NewRoom from '@/components/NewRoom'
import EditRoom from '@/components/EditRoom'
import Room from '@/components/Room'

Vue.use(Router)

export default new Router({
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
          path: '/room',
          name: 'Room',
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
})
