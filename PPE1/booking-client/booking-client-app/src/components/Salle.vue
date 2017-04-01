<template>
    <div class="salle">
      <h1>Liste des salles</h1>

      <SallePicker v-bind:on-selected-room-change="changeSelectedRoom" />

      <div class="room-description">
        {{ selectedRoom.description }}
      </div>
    </div>
</template>

<script>
  import SallePicker from '@/components/SallePicker'

  export default {
    name: 'salle',
    methods: {
      changeSelectedRoom: function(newRoom) {
        this.selectedRoom = newRoom;
      }
    },
    data () {
      return { 
        selectedRoom: {}
      }
    },
    components: {
      SallePicker
    }
  }
</script>

<style scoped>
  h1 {
    font-weight: normal;
  }

  .room-description {
    text-align: justify;
    margin-top: 20px;
  }
</style>
