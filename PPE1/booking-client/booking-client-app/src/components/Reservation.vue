<template>
<div class="reservation">
      <h1>Réservation</h1>

      <form>
        <select name="room" id="room" class="spacebetween">
            <option value="amphiteatre">amphiteatre</option>
            <option value="reunion">Salle de réunion</option>
            <option value="convivial">Salle de convivialité</option>
        </select>
        <datepicker></datepicker>

        <M2LButton label="Enregistrer ma réservation" v-bind:action="book" />
      </form>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import M2LButton from '@/components/M2LButton';

export default {
  name: 'reservation', 
  components: {
      Datepicker,
      M2LButton
  },
  methods: {
    book: () => {
      console.log('Booked');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
</style>
