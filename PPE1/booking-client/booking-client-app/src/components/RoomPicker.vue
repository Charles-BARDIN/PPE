<template>
  <div>
    <select class="room-picker" id="room">
      <option v-for="room in rooms">{{ room.label }}</option>
    </select>
    <div>
      {{ error }}
    </div>
  </div>
</template>

<script>
  import bookingClientLib from '@/lib-adapter';

  const roomService = bookingClientLib.getRoomService();

  export default {
    name: 'room-picker',
    created: function() {
      const displayRoomListError = this.displayRoomListError;
      const setRoomList = this.setRoomList;

      const controller = {
        displayRoomListError,
        setRoomList
      }
      roomService.controller = controller;
      roomService.onPageLoad();
    },
    data () {
      return {
        rooms: [],
        error: undefined,
        selectedRoomLabel: ''
      }
    },
    methods: {
      displayRoomListError: function (err) {
        this.error = err;
      },
      setRoomList: function (list) {
        this.rooms=list;
      }
    },
    props: ['onSelectedRoomChange']
  }
</script>

<style scoped>
</style>
