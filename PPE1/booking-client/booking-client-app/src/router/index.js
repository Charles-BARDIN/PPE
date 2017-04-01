import Vue from 'vue'
import Router from 'vue-router'
import Acceuil from '@/components/Acceuil'
import Inscription from '@/components/Inscription'
import Profil from '@/components/Profil'
import Reservation from '@/components/Reservation'
import Salle from '@/components/Salle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '/', 
      name : 'Acceuil', 
      component : Acceuil
    },
    {
      path : '/inscription', 
      name : 'Inscription' , 
      component : Inscription  
    },
    {
      path : '/profil', 
      name : 'Profil', 
      component : Profil
    },
    {
      path : '/reservation',
      name : 'reservation', 
      component : Reservation
    },
    {
      path : '/salle' , 
      name : 'salle', 
      component : Salle 
    }

  ]
})
