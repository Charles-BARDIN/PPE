<template>
  <div>
    <M2LTitle>Liste des salles</M2LTitle>
    <div>
      <M2LButton label="Ajouter une salle" class="button" v-bind:action="onNewClicked" />      
    </div>
    <Error>
      <div v-for="error in errors">{{ error }}</div>
    </Error>
    <table v-if="rooms.length > 0">
      <tr v-for="room in rooms">
        <td class="room-name">{{ room.name }}</td>
        <td class="room-description">{{ room.description }}</td>
        <td class="room-actions">
          <M2LButton label="Supprimer" class="button" v-bind:action="ondeleteClick(room)" />
          <M2LButton label="Modifier" class="button" v-bind:action="oneditClick(room)" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import M2LButton from '@/components/M2LButton'
import M2LTitle from '@/components/M2LTitle'
import Error from '@/components/Error'

import adminClientLib from '@/lib-adapters'

const roomService = adminClientLib.roomService;

export default {
  name: 'room',
  created: function() {
    const controller = {
      setRoomList: this.setRoomList,
      showErrors: this.showErrors
    }

    roomService.controller = controller;

    roomService.onPageLoad();
  },
  data () {
    return {
      rooms: [],
      errors: []
    };
  },
  methods: {
    ondeleteClick: room => {
      return () => roomService.onRemoveClick(room);
    },
    oneditClick: room => {
      return () => roomService.onEditClick(room);
    },
    onNewClicked: () => {
      roomService.onNewClick();
    },
    setRoomList,
    showErrors
  },
  components: {
    M2LButton,
    M2LTitle,
    Error
  }
}

function setRoomList(list) {
  this.rooms = list;
}

function showErrors(errors) {
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
  height : 50px ;
}

.room-name {
  width: 20%;
  max-width :50px ;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.room-description {
    width: auto;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 10px;
}

.room-actions {
  width: 210px;
}
</style>
