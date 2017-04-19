<template>  
  <div>
    <RoomForm mode="edit" v-bind:on-add-click="onAddClick" v-bind:on-cancel-click="onCancelClick" v-bind:room="room" />

    <Error>
      <div v-for="error in errors">
        {{ error }}
      </div>
    </Error>

    <Confirm v-if="showConfirm">
      Salle modifiée avec succès !
    </Confirm>
  </div>
</template>

<script>
import bus from '@/bus';
import Error from '@/components/Error';
import Confirm from '@/components/Confirm';
import RoomForm from '@/components/RoomForm';

import adminClientLib from '@/lib-adapters';

const roomEditService = adminClientLib.roomEditService;

export default {
  name: 'edit-room',
  components: {
    Error,
    Confirm,
    RoomForm
  },
  created: function() {
    const controller = {
      showErrors: this.showErrors,
      showConfirmation: this.showConfirmation,
      hideMessages: this.hideMessages,
      setRoom: this.setRoom,
      setRoomImage: this.setRoomImage      
    };

    roomEditService.controller = controller;

    roomEditService.onPageLoad();
  },
  data () {
    return {
      errors: [],
      showConfirm: false,
      room: {}
    }
  },
  methods: {
    onAddClick: function(room) {
      console.log(room)
      roomEditService.editRoom(room);
    },
    onCancelClick: function() {
      roomEditService.cancel();
    },
    setRoom,
    showErrors,
    showConfirmation,
    hideMessages,
    setRoomImage
  }
};

function setRoomImage(image) {
  bus.$emit('roomImageSetted', image)
  this.room.image = image;
}

function setRoom(room) {
  this.room = room;
};

function showErrors(errors) {
  this.errors = errors;
}

function showConfirmation() {
  this.showConfirm = true;
}

function hideMessages() {
  this.errors = [];
  this.showConfirm = false;
}
</script>

<style scoped>
</style>