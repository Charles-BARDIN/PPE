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
  name: 'header',
  data () {
    return {
      msg: 'Hello world'
    }
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
