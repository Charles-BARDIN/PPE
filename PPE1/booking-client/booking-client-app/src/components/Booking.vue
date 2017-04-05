<template>
<div class="booking">
  <Title>Réservation</Title>

  <form>
    <div>
      <span>Salle</span>
      <RoomPicker v-bind:on-selected-room-change="changeSelectedRoom" v-bind:rooms="rooms" />
    </div>

    <div>
      <span>Date</span>
      <datepicker class="inputs" v-model="booking.date" v-bind:disabled="disabledConfig"></datepicker>
    </div>

    <M2LButton label="Enregistrer ma réservation" v-bind:action="book" />
  </form>

  <div v-for="err in errors">{{ err | error }}</div>
  <Confirm v-if="confirm">Votre réservation a bien été effectuée.</Confirm>
</div>
</template>

<script>
import bookingClientLib from '@/lib-adapter'

import Datepicker from 'vuejs-datepicker';
import M2LButton from '@/components/M2LButton';
import RoomPicker from '@/components/RoomPicker';
import Title from '@/components/M2LTitle';
import Confirm from '@/components/Confirm';
import { errorFilter } from '@/common';
import Vue from 'vue';


Vue.filter('error', errorFilter);

const bookingService = bookingClientLib.bookingService;

export default {
  name: 'booking', 
  components: {
      Datepicker,
      M2LButton,
      RoomPicker,
      Title,
      Confirm,
  },
  created: function() {
    const setRoomList = this.setRoomList;
    const displayRoomListError = this.displayRoomListError;
    const showValidationErrors = this.showValidationErrors;
    const showConfirmation = this.showConfirmation;
    const showBackendError = this.showBackendError;
    const hideMesssages = this.hideMesssages;

    const controller = {
      setRoomList,
      displayRoomListError,
      showValidationErrors,
      showConfirmation,
      showBackendError,
      hideMesssages,
    };

    bookingService.controller = controller;

    bookingService.onPageLoad();
  },
  data () {
    return {
      booking: {
        roomID: undefined,
        date: undefined
      },
      rooms: [],
      confirm: false,
      errors: [],
      disabledConfig: { to: new Date() }
    }
  },
  methods: {
    book: function() {
      bookingService.bookARoom(this.booking);
    },
    changeSelectedRoom: function(newRoom) {
      this.booking.room = newRoom
    },
    setRoomList: function(list) {
      this.rooms = list;
    },
    displayRoomListError: function(error) {
      this.errors = [error];
    },
    showValidationErrors: function(errors) {
      this.errors = errors;
    },
    showBackendError: function(err) {
      this.errors = [err];      
    },
    hideMesssages: function() {
      this.errors = [];
      this.confirm = false;
    },
    showConfirmation: function() {
      this.confirm = true
    },
    changeSelectedRoom: function(newRoom) {
      this.booking.roomID = newRoom.id;
    }
  }
}
</script>

<style scoped>
.inputs {
  margin: 6px;
  margin-bottom: 10px;
}

span {
  display: block;
}
</style>
