<template>  
  <div>
    <RoomForm mode="new" v-bind:on-add-click="onAddClick" v-bind:on-cancel-click="onCancelClick"/>

    <Error>
      <div v-for="error in errors">
        {{ error }}
      </div>
    </Error>

    <Confirm v-if="showConfirm">
      Salle ajoutée avec succès !
    </Confirm>
  </div>
</template>

<script>
import Error from '@/components/Error';
import Confirm from '@/components/Confirm';
import RoomForm from '@/components/RoomForm';

import adminClientLib from '@/lib-adapters';

const roomNewService = adminClientLib.roomNewService;

export default {
  name: 'new-room',
  components: {
    Error,
    Confirm,
    RoomForm
  },
  created: function() {
    const controller = {
      showErrors: this.showErrors,
      showConfirmation: this.showConfirmation,
      hideMessages: this.hideMessages
    };
    roomNewService.controller = controller;
    roomNewService.onPageLoad();
  },
  data () {
    return {
      errors: [],
      showConfirm: false
    }
  },
  methods: {
    onAddClick: function(room) {
      roomNewService.addRoom(room);
    },
    onCancelClick: function() {
      roomNewService.cancel();
    },
    showErrors,
    showConfirmation,
    hideMessages
  }
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