<template>
  <div v-if="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              Annuler une réservation
            </div>

            <div class="modal-body">
              Voulez-vous vraiment vous vraiment annuler la réservation de la salle <strong>{{ booking.roomName }}</strong> le <strong>{{ booking.date | date }}</strong> ?
            </div>

            <Error>
              <div v-for="error in errors">{{ error | error }}</div>
            </Error>

            <div class="modal-footer">
              <M2LButton class="button" label="Annuler" v-bind:action="oncancel" />
              <M2LButton class="button" label="OK" v-bind:action="onconfirm" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import adminClientLib from '@/lib-adapters'
  import M2LButton from '@/components/M2LButton'
  import Error from '@/components/Error'
  import { errorFilter } from '@/common';

  Vue.filter('error', errorFilter);

  const bookingCancelService = adminClientLib.bookingCancelService;

  Vue.filter('date', input => {
    return new Date(input).toLocaleDateString()
  })
  
  export default {
    name: 'cancel-booking',
    props: ['showModal', 'onCancel'],
    created: function() {
      const controller = {
        displayBackendErrors: this.displayBackendErrors,
      };

      bookingCancelService.controller = controller;

      this.booking = bookingCancelService.booking;
      bookingCancelService.onPageLoad();
    },
    methods: {
      onconfirm: function() {
        bookingCancelService.onValidate();
      },
      oncancel: function() {
        this.onCancel();
      },
      displayBackendErrors,
    },
    data () {
      return {
        booking: {},
        errors: []
      };
    },
    components: {
      M2LButton,
      Error
    }
  };

  function displayBackendErrors(errors) {
    this.errors = errors
  }
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin: 20px 0;
  color: #42b983;
}

.modal-body {
  margin-top: 20px;
}

.modal-footer {
  text-align: right;
}

.button {
  margin-left: 10px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>