<template>
  <div>
    <M2LTitle>Liste des réservations</M2LTitle>

    <Error>
      <div v-for="error in errors">{{ error }}</div>
    </Error>

    <div id="filter">
      <div>
        <label>Salle</label>
        <RoomPicker v-bind:on-selected-room-change="changeSelectedRoom" v-bind:rooms="rooms" />
      </div>

      <div>
        <label>Mail</label>
        <input type="text" v-model="filter.mail"/>
      </div>

      <div>
        <label>Date</label>
        <input type="date" v-model="filter.date" />
      </div>

      <div>
        <M2LButton label="Filtrer" v-bind:action="filterRooms" />
      </div>
    </div>

    <table v-if="bookings.length > 0">
      <tr v-for="booking in bookings">
        <td class="booking-date">{{ booking.date | date }}</td>
        <td class="booking-room">{{ booking.roomName }}</td>
        <td class="booking-user">{{ booking.userMail }}</td>
        <td class="booking-actions">
          <M2LButton label="Annuler" class="button" v-bind:action="onCancelClick(booking)" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Vue from 'vue';

import M2LTitle from '@/components/M2LTitle'
import M2LButton from '@/components/M2LButton'
import Error from '@/components/Error'
import RoomPicker from '@/components/RoomPicker'

import adminClientLib from '@/lib-adapters';

Vue.filter('date', input => {
  return new Date(input).toLocaleDateString()
})

const bookingService = adminClientLib.bookingService;

export default {
  name: 'bookings',
  created: function() {
    const controller = {
      setBookingList: this.setBookingList,
      setBackendErrors: this.setBackendErrors,
      setRoomList: this.setRoomList
    };

    bookingService.controller = controller;

    bookingService.onPageLoad();
  },
  components: {
    M2LTitle,
    Error,
    M2LButton,
    RoomPicker
  },
  data() {
    return {
      bookings: [],
      errors: [],
      filter: {},
      rooms: []
    }
  },
  methods: {
    onCancelClick: (room) => {
      return () => bookingService.onCancelClick(room);
    },
    filterRooms: function() {
      bookingService.onFilterClick({
        room: this.filter.room,
        date: this.filter.date ? new Date(this.filter.date) : undefined,
        mail: this.filter.mail
      });
    },
    changeSelectedRoom: function(newRoom) {
      this.filter.room = newRoom ? newRoom.id : undefined;
    },
    setBookingList,
    setBackendErrors,
    setRoomList
  }
}

function setBookingList(list) {
  this.bookings = list;
}

function setRoomList(list) {
  this.rooms = list;
}

function setBackendErrors(errors) {
  this.errors = errors;
}
</script>

<style scoped>
table {
  width: 80%;
  margin: auto;
  border: 1px solid black;
  margin-top: 10px;
}

td {
  text-align: left;
}

#filter div {
  display: inline-block;
  width: 20%;
  white-space: nowrap;
}
</style>
