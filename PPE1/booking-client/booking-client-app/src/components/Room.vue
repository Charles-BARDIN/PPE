<template>
    <div class="room">
      <h1>Liste des salles</h1>

      <RoomPicker v-bind:on-selected-room-change="changeSelectedRoom" />

      <div class="room-description">
        {{ selectedRoom.description }}
      </div>
    </div>
</template>

<script>
  import RoomPicker from '@/components/RoomPicker'

  export default {
    name: 'room',
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
      RoomPicker
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
