<template>
    <div class="index">
      <h1>M2L Accueil</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique repellat in sed aliquam voluptates, cumque atque
        libero suscipit soluta, necessitatibus labore ex deserunt dicta ullam ducimus vel. Harum, numquam, vero. Lorem ipsum
        dolor sit amet, consectetur adipisicing elit. Similique repellat in sed aliquam voluptates, cumque atque libero suscipit
        soluta, necessitatibus labore ex deserunt dicta ullam ducimus vel. Harum, numquam, vero. Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Similique repellat in sed aliquam voluptates, cumque atque libero suscipit soluta,
        necessitatibus labore ex deserunt dicta ullam ducimus vel. Harum, numquam, vero. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Similique repellat in sed aliquam voluptates, cumque atque libero suscipit soluta, necessitatibus
        labore ex deserunt dicta ullam ducimus vel. Harum, numquam, vero. Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Similique repellat in sed aliquam voluptates, cumque atque libero suscipit soluta, necessitatibus labore ex
        deserunt dicta ullam ducimus vel. Harum, numquam, vero. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Similique repellat in sed aliquam voluptates, cumque atque libero suscipit soluta, necessitatibus labore ex deserunt
        dicta ullam ducimus vel. Harum, numquam, vero.
      </p>

       <M2LButton label="Réserver une salle" v-bind:action="onBookingButtonClick" />
    </div>
</template>

<script>
  import M2LButton from '@/components/M2LButton'

  import router from '@/router'

  import bookingClientLib from '@/lib-adapter'

  const indexService = bookingClientLib.indexService;

  export default {
    name: 'index',
    components: {
        M2LButton
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
</style>
