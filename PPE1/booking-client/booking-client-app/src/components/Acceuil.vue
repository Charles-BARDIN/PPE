<template>
    <div class="accueil">
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

       <M2LButton label="Réserver une salle" v-bind:action="bookARoom" />
    </div>
</template>

<script>
  import M2LButton from '@/components/M2LButton'

  import router from '@/router'

  export default {
    name: 'accueil',
    components: {
        M2LButton
    },
    methods: {
      bookARoom: () => {
        router.push('reservation')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    font-weight: normal;
  }
</style>
