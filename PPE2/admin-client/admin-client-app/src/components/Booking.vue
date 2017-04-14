<template>
  <div>
    <M2LTitle>Liste des réservations</M2LTitle>

    <Error>
      <div v-for="error in errors">{{ error }}</div>
    </Error>

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
      setBackendErrors: this.setBackendErrors
    };

    bookingService.controller = controller;

    bookingService.onPageLoad();
  },
  components: {
    M2LTitle,
    Error,
    M2LButton
  },
  data() {
    return {
      bookings: [],
      errors: []
    }
  },
  methods: {
    onCancelClick: (room) => {
      return () => bookingService.onCancelClick(room);
    },
    setBookingList,
    setBackendErrors
  }
}

function setBookingList(list) {
  this.bookings = list;
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
</style>
