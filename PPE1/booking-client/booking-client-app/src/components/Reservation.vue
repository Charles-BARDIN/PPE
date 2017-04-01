<template>
<div class="jumbotron notopnobottom">
      <h1>M2L-Reservation</h1>

      <form action="">
        <select name="room" id="room" class="spacebetween">
                    <option value="amphiteatre">amphiteatre</option>
                    <option value="reunion">Salle de réunion</option>
                    <option value="convivial">Salle de convivialité</option>
                </select>
        <datepicker></datepicker>
        <br>
        <input type="submit" class="btn btn-lg btn-success" value="Enregistrer ma réservation">
      </form>
    </div>
  </div>
    
</template>

<script>

import Datepicker from 'vuejs-datepicker';


export default {
  name: 'header',
  data () {
    return {
      msg: 'Hello world'
    }
  }, components: {
        Datepicker
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}


</style>
