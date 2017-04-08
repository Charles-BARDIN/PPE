<template>
    <div class="index">
      <M2LTitle>M2L Accueil</M2LTitle>

      <p>
        Bienvenue sur le site de réservations des salles de la M2L. <br>
        Pour réserver une salle pour toutes vos activités, réunions, présentations, soirées de convenances, 
        n'hésitez pas à contacter la maison des ligues 
        de Lorraine ou à réserver votre salle directement sur notre site Web. <br>
        Pour réserver une salle, veuillez vous authentifiez ou vous inscrire <br>
        <table>
          <tr>Le prix des salles est indiqué ci-contre :</tr>
          <tr>
            <td>Amphithéatre : </td>
            <td>500 € la demi-journée</td>
          </tr>
        <tr>
          <td>Salle de réunion : </td>
          <td>250 € la demi-journée</td>
        </tr>
        <tr>
          <td>Salle de convivialité : </td>
          <td>200 € la demi-journée</td>
        </tr>
        </table>
      </p>

       <M2LButton label="Réserver une salle" v-bind:action="onBookingButtonClick" />
    </div>
</template>

<script>
  import M2LButton from '@/components/M2LButton'

  import router from '@/router'

  import bookingClientLib from '@/lib-adapter'
  import M2LTitle from '@/components/M2LTitle';

  const indexService = bookingClientLib.indexService;

  export default {
    name: 'index',
    components: {
        M2LButton,
        M2LTitle,
    },
    methods: {
      onBookingButtonClick: () => {
        indexService.goToBookingState();
      }
    }
  }
</script>

<style scoped>
  p {
    font-size : large ;
    
  }
</style>
