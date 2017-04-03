<template>
<div class="booking">
  <h1>Réservation</h1>

  <form>
    <div>
      <span>Salle</span>
      <RoomPicker class="inputs" v-bind:on-selected-room-change="changeSelectedRoom" />
    </div>

    <div>
      <span>Date</span>
      <datepicker class="inputs" v-model="booking.date"></datepicker>
    </div>

    <M2LButton label="Enregistrer ma réservation" v-bind:action="book" />
  </form>
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
    bookingService.onPageLoad();
  },
  data () {
    return {
      booking: {
        room: null,
        date: null
      }
    }
  },
  methods: {
    book: function() {
      console.log('Booked for room', this.booking.room.label, new Date(this.booking.date + 'UTC'))
    },
    changeSelectedRoom: function(newRoom) {
      this.booking.room = newRoom
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
