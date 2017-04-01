<template>
    <div class="salle">
      <h1>Liste des salles</h1>

      <form action="">
        <select name="room" id="room" v-model="selectedRoomLabel">
          <option v-for="room in rooms">{{ room.label }}</option>
        </select>
      </form>

      <div class="room-description">
        {{ selectedRoom.description }}
      </div>
    </div>
</template>

<script>
  export default {
    name: 'salle',
    data () {
      return {
        rooms: [
          {
            label: 'Amphithéâtre',
            img: '',
            description: 'Description Amphithéâtre'
          },
          {
            label: 'Salle de réunion',
            img: '',
            description: 'Description Salle de réunion'
          },
          {
            label: 'Salle de convivialité',
            img: '',
            description: 'Description Salle de convivialité'
          }
        ],
        selectedRoom: {},
        selectedRoomLabel: ''
      }
    },
    watch: {
      selectedRoomLabel: function(newRoom) {
        this.selectedRoom = this.rooms.filter(room => room.label === newRoom)[0]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    font-weight: normal;
  }

  .room-description {
    text-align: justify;
    margin-top: 20px;
  }
</style>
