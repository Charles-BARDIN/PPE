<template>
    <div class="jumbotron notopnobottom">
      <h1>Inscription</h1>
      <form>
        <div>
          <label for="lastname" class="labelo">Nom</label>
          <input type="text" name="lastname" class="space" />
        </div>
        <div>
          <label for="firstname" class="labelo">Prénom</label>
          <input type="text" name="firstname" class="space" />
        </div>
        <div>
          <label for="numberstreet" class="labelo">N°</label>
          <input type="number" min="0" name="numberstreet" class="space"/>
        </div>
        <div>
          <label for="labelStreet" class="labelo">Voie</label>
          <select name="labelStreet" id="labelStreet" class="spaceSelect">
            <option value="blanck" selected> </option>
            <option value="rue">Rue</option>
            <option value="ruelle">Ruelle</option>
            <option value="allee">Allée</option>
            <option value="impasse">Impasse</option>
            <option value="route">Route</option>
            <option value="rue">Avenue</option>
          </select>
        </div>
        <div>
          <label for="adress" class="labelo">Adresse</label>
          <input type="text" name="adress" class="space" />
        </div>
        <div>
          <label for="city" class="labelo">Ville</label>
          <input type="text" name="city" class="space" />
        </div>
        <div>
          <label for="country" class="labelo">Pays</label>
          <select name="country" id="country" class="spaceSelect">
              <option value="france" selected>France</option>
              <option value="allemagne">Allemagne</option>
              <option value="luxembourg">Luxembourg</option>
              <option value="belgique">Belgique</option>
              <option value="suisse">Suisse</option>
          </select>
        </div>
        <div>
          <label for="mail" class="labelo">Adresse mail</label>
          <input type="email" name="email" class="space" />
        </div>
        <div>
          <label for="name" class="labelo">Téléphone</label>
          <input type="text" name="name" class="space" />
        </div>
        <div>
          <label for="name" class="labelo">Mot de passe</label>
          <input type="password" name="name" class="space" />
        </div>
        <div>
          <label for="name" class="labelo">Confirmation</label>
          <input type="confirm" name="name" class="space" />
        </div>

        <input type="submit" value="S'inscrire" />
      </form>
  </div>
</template>

<script>
  export default {
    name: 'inscription'
  }
</script>

<style scoped>
  h1 {
    font-weight: normal;
  }

  label {
    display: inline-block;
    width: 250px;
    text-align: left;
  }

  input, select {
    width: 250px;
  }

  form div {
    padding: 6px;
  }

  input[type=submit] {
    margin-top: 10px;
  }
</style>
