<template>
    <div class="inscription">
      <h1>Inscription</h1>
      <form>
        <div>
          <label for="lastname">Nom</label>
          <input type="text" name="lastname" class="space" />
        </div>
        <div>
          <label for="firstname">Prénom</label>
          <input type="text" name="firstname" class="space" />
        </div>
        <div>
          <label for="numberstreet">N°</label>
          <input type="number" min="0" name="numberstreet" class="space"/>
        </div>
        <div>
          <label for="labelStreet">Voie</label>
          <select name="labelStreet" id="labelStreet">
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
          <label for="adress">Adresse</label>
          <input type="text" name="adress" class="space" />
        </div>
        <div>
          <label for="city">Ville</label>
          <input type="text" name="city" class="space" />
        </div>
        <div>
          <label for="country">Pays</label>
          <select name="country" id="country">
              <option value="france" selected>France</option>
              <option value="allemagne">Allemagne</option>
              <option value="luxembourg">Luxembourg</option>
              <option value="belgique">Belgique</option>
              <option value="suisse">Suisse</option>
          </select>
        </div>
        <div>
          <label for="mail">Adresse mail</label>
          <input type="email" name="email" class="space" />
        </div>
        <div>
          <label for="name">Téléphone</label>
          <input type="text" name="name" class="space" />
        </div>
        <div>
          <label for="name">Mot de passe</label>
          <input type="password" name="name" class="space" />
        </div>
        <div>
          <label for="name">Confirmation</label>
          <input type="confirm" name="name" class="space" />
        </div>

        <M2LButton label="Inscription" v-bind:action="register" />
      </form>
  </div>
</template>

<script>
  import M2LButton from '@/components/M2LButton'

  export default {
    name: 'inscription',
    methods: {
      register: () => {
        console.log('registered')
      }
    },
    components: {
      M2LButton
    }
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
