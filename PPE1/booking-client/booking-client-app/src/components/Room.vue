<template>
    <div class="room">
      <Title>Liste des salles</Title>

      <RoomPicker v-bind:onSelectedRoomChange="changeSelectedRoom" v-bind:rooms="rooms" />

      <div>
        {{ error | error }}
      </div>

      <div class="room-description">
        {{ selectedRoom.description }}
      </div>
    </div>
</template>

<script>
  import Vue from 'vue';
  import bookingClientLib from '@/lib-adapter';
  import RoomPicker from '@/components/RoomPicker';
  import Title from '@/components/M2LTitle';
  import { errorFilter } from '@/common';

  Vue.filter('error', errorFilter);

  const roomService = bookingClientLib.roomService;

  export default {
    name: 'room',
    created: function (){
      const displayRoomListError = this.displayRoomListError;
      const setRoomList = this.setRoomList;
      const displayRoomDescription = this.displayRoomDescription;

      const controller = {
        displayRoomListError,
        setRoomList,
        displayRoomDescription
      };

      roomService.controller = controller;
      roomService.onPageLoad();
    },
    methods: {
      changeSelectedRoom: function(newRoom) {
        roomService.changeRoomSelection(newRoom);
      },
      displayRoomDescription: function (room) {
        room.description = room.description || '';
        this.selectedRoom = room;
      },
      displayRoomListError: function (err) {
        this.error = err;
      },
      setRoomList: function (list) {
        this.rooms = list;
      }
    },
    data () {
      return { 
        selectedRoom: {},
        rooms: ["amphithéatre","Salle de réunion","Salle de convivialité"],
        error: ''
      }
    },
    components: {
      RoomPicker,
      Title,
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
