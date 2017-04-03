<template>
<div class="profile">
  <h1>{{ title }}</h1>
  <form>
    <div>
      <label for="lastname">Nom</label>
      <input type="text" v-if="mode === 'edit'" disabled v-model="formUser.fullname" />
      <input type="text" v-if="mode === 'new'" v-model="formUser.lastname" />
    </div>
    <div v-if="mode === 'new'">
      <label for="firstname">Prénom</label>
      <input type="text" v-model="formUser.firstname" />
    </div>
    <div>
      <label for="numberstreet">N°</label>
      <input type="number" min="1" v-model="formUser.address.number" />
    </div>
    <div>
      <label for="labelStreet">Voie</label>
      <select id="labelStreet" v-model="formUser.address.type" >
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
      <input type="text" v-model="formUser.address.address" />
    </div>
    <div>
      <label for="city">Ville</label>
      <input type="text" v-model="formUser.town" />
    </div>
    <div>
      <label for="country">Pays</label>
      <select id="country"  v-model="formUser.country">
          <option value="France" selected>France</option>
          <option value="Allemagne">Allemagne</option>
          <option value="Luxembourg">Luxembourg</option>
          <option value="Belgique">Belgique</option>
          <option value="Suisse">Suisse</option>
      </select>
    </div>
    <div>
      <label for="mail" >Adresse mail</label>
      <input type="email" v-model="formUser.mail" />
    </div>
    <div>
      <label for="name">Téléphone</label>
      <input type="text"  v-model="formUser.phone" />
    </div>
    <div v-if="mode === 'edit'">
      <label for="name">Ancien mot de passe</label>
      <input type="password" v-model="formUser.oldPassword" />
    </div>
    <div>
      <label for="name">Mot de passe</label>
      <input type="password"  v-model="formUser.password" />
    </div>
    <div>
      <label for="name">Confirmation</label>
      <input type="confirm" v-model="formUser.confirm" />
    </div>

    <M2LButton v-bind:label="mode === 'new' ? 'Inscription' : 'Modifier le profile'" v-bind:action="onConfirm" />
  </form>
</div>
</template>

<script>
import M2LButton from '@/components/M2LButton';

export default {
  name: 'profile',
  props: ['mode', 'onConfirm', 'user'],
  created: function() {
    if(this.user) {
      this.formUser = Object.assign({}, this.user);
      this.formUser.fullname = `${this.user.firstname} ${this.user.lastname}`;

      let addressFields = this.formUser.address.split(' ');
      const number = addressFields[0];
      addressFields.shift()

      const type = addressFields[0];
      addressFields.shift()

      const address = addressFields.join(' ');

      this.formUser.address = {
        number,
        type,
        address
      }
    }
  }, 
  data () {
    return {
      title: this.mode === 'edit' ? 'Modifier le profile' : 'Inscription',
      formUser: {
        address: {}
      }
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
