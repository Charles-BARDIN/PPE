<template>
  <select class="room-picker" id="room" v-model="selectedRoomLabel">
    <option v-for="room in rooms">{{ room.label }}</option>
  </select>
</template>

<script>
  export default {
    name: 'room-picker',
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
        selectedRoomLabel: ''
      }
    },
    props: ['onSelectedRoomChange'],
    watch: {
      selectedRoomLabel: function(newRoom) {
        this.onSelectedRoomChange(this.rooms.filter(room => room.label === newRoom)[0]);
      }
    }
  }
</script>

<style scoped>
</style>
