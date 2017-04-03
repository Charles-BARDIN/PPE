<template>
<div class="profile">
  <h1>{{ title }}</h1>
  <form>
    <div>
      <label for="lastname">Nom</label>
      <input type="text" class="space" :disabled="mode === 'edit'" />
    </div>
    <div v-if="mode === 'new'">
      <label for="firstname">Prénom</label>
      <input type="text" class="space" />
    </div>
    <div>
      <label for="numberstreet">N°</label>
      <input type="number" min="1" class="space"/>
    </div>
    <div>
      <label for="labelStreet">Voie</label>
      <select id="labelStreet">
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
      <input type="text" class="space" />
    </div>
    <div>
      <label for="city">Ville</label>
      <input type="text" class="space" />
    </div>
    <div>
      <label for="country">Pays</label>
      <select id="country">
          <option value="france" selected>France</option>
          <option value="allemagne">Allemagne</option>
          <option value="luxembourg">Luxembourg</option>
          <option value="belgique">Belgique</option>
          <option value="suisse">Suisse</option>
      </select>
    </div>
    <div>
      <label for="mail">Adresse mail</label>
      <input type="email" class="space" />
    </div>
    <div>
      <label for="name">Téléphone</label>
      <input type="text" class="space" />
    </div>
    <div v-if="mode === 'edit'">
      <label for="name">Ancien mot de passe</label>
      <input type="password" class="space" />
    </div>
    <div>
      <label for="name">Mot de passe</label>
      <input type="password" class="space" />
    </div>
    <div>
      <label for="name">Confirmation</label>
      <input type="confirm" class="space" />
    </div>

    <M2LButton v-bind:label="mode === 'new' ? 'Inscription' : 'Modifier le profile'" v-bind:action="onConfirm" />
  </form>
</div>
</template>

<script>
import M2LButton from '@/components/M2LButton';

export default {
  name: 'profile',
  props: ['mode', 'onConfirm'],
  data () {
    return {
      title: this.mode === 'edit' ? 'Modifier le profile' : 'Inscription'
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
