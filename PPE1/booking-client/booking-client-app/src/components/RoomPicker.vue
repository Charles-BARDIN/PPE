<template>
  <div>
    <select class="room-picker" id="room" v-model="selectedRoom">
      <option v-for="room in rooms">{{ room.name }}</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'room-picker',
    data () {
      return {
        selectedRoom: {}
      }
    },
    watch: {
      selectedRoom: function(newRoom) {
        this.onSelectedRoomChange(this.rooms.filter(room => room.name === newRoom)[0]);
      }
    },
    props: ['onSelectedRoomChange', 'rooms']
  }
</script>

<style scoped>
</style>
