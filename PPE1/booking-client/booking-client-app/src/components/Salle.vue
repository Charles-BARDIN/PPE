<template>
    <div class="jumbotron notopnobottom">
      <h1>Liste des salles</h1>
      <div class="flexcenter">
        <form action="">
          <select name="room" id="room">
            <option value="amphiteatre">amphiteatre</option>
            <option value="reunion">Salle de réunion</option>
            <option value="convivial">Salle de convivialité</option>
          </select>
        </form>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'salle'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    font-weight: normal;
  }
</style>
