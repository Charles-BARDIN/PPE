<template>
<div class="booking">
  <h1>Réservation</h1>

  <form>
    <div>
      <span>Salle</span>
      <RoomPicker v-bind:on-selected-room-change="changeSelectedRoom" v-bind:rooms="rooms" />
    </div>

    <div>
      <span>Date</span>
      <datepicker class="inputs" v-model="booking.date"></datepicker>
    </div>

    <M2LButton label="Enregistrer ma réservation" v-bind:action="book" />
  </form>

  <div v-for="err in errors">{{ err }}</div>
  <div v-if="confirm">Votre réservation a bien été effectuée.</div>
</div>
</template>

<script>
import bookingClientLib from '@/lib-adapter'

import Datepicker from 'vuejs-datepicker';
import M2LButton from '@/components/M2LButton';
import RoomPicker from '@/components/RoomPicker';

const bookingService = bookingClientLib.getBookingService();

export default {
  name: 'booking', 
  components: {
      Datepicker,
      M2LButton,
      RoomPicker
  },
  created: function() {
    const setRoomList = this.setRoomList;
    const displayRoomListError = this.displayRoomListError;
    const showValidationErrors = this.showValidationErrors;
    const showConfirmation = this.showConfirmation;
    const showBackendError = this.showBackendError;
    const hideErrors = this.hideErrors;

    const controller = {
      setRoomList,
      displayRoomListError,
      showValidationErrors,
      showConfirmation,
      showBackendError,
      hideErrors,
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
      errors: []
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
    hideErrors: function() {
      this.errors = [];
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
h1 {
  font-weight: normal;
}

.inputs {
  margin: 6px;
  margin-bottom: 10px;
}

span {
  display: block;
}
</style>
