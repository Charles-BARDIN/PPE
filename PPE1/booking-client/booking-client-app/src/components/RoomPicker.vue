<template>
  <div>
    <select class="room-picker" id="room" v-model="selectedRoom">
      <option v-for="room in rooms">{{ room.label }}</option>
    </select>
  </div>
</template>

<script>
  import bookingClientLib from '@/lib-adapter';

  const roomService = bookingClientLib.getRoomService();

  export default {
    name: 'room-picker',
    data () {
      return {
        selectedRoom: {}
      }
    },
    watch: {
      selectedRoom: function(newRoom) {
        this.onSelectedRoomChange(this.rooms.filter(room => room.label === newRoom)[0]);
      }
    },
    props: ['onSelectedRoomChange', 'rooms']
  }
</script>

<style scoped>
</style>
