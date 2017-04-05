<template>
    <div class="index">
      <Title>M2L Accueil</Title>

      <p>
        Bienvenue sur le site de réservations des salles de la M2L. <br>
        Pour réserver une salle pour toutes vos activités, réunions, présentations, soirées de convenances, 
        n'hésitez pas à contacter la maison des ligues 
        de Lorraine ou à réserver votre salle directement sur notre site Web. <br>
        Pour réserver une salle, veuillez vous authentifiez ou vous inscrire
      </p>

       <M2LButton label="Réserver une salle" v-bind:action="onBookingButtonClick" />
    </div>
</template>

<script>
  import M2LButton from '@/components/M2LButton'

  import router from '@/router'

  import bookingClientLib from '@/lib-adapter'
  import Title from '@/components/M2LTitle';

  const indexService = bookingClientLib.indexService;

  export default {
    name: 'index',
    components: {
        M2LButton,
        Title,
    },
    methods: {
      onBookingButtonClick: () => {
        indexService.goToBookingState();
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-weight: normal;
  }
  p {
    font-size : large ;
    
  }
</style>
