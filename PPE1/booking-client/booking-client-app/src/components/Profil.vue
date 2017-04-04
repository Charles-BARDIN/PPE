<template>
<div class="profil">
  <h1>{{ title }}</h1>
  <form>
    <div>
      <label>Nom</label>
      <input type="text" v-if="mode === 'edit'" disabled v-model="formUser.fullname" />
      <input type="text" v-if="mode === 'new'" v-model="formUser.lastname" />
    </div>
    <div v-if="mode === 'new'">
      <label>Prénom</label>
      <input type="text" v-model="formUser.firstname" />
    </div>
    <div>
      <label>N°</label>
      <input type="number" min="1" v-model="formUser.address.number" />
    </div>
    <div>
      <label>Voie</label>
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
      <label>Adresse</label>
      <input type="text" v-model="formUser.address.address" />
    </div>
    <div>
      <label>Code postal</label>
      <input type="text" v-model="formUser.zip" />
    </div>
    <div>
      <label>Ville</label>
      <input type="text" v-model="formUser.town" />
    </div>
    <div>
      <label>Pays</label>
      <select id="country"  v-model="formUser.country">
          <option value="France" selected>France</option>
          <option value="Allemagne">Allemagne</option>
          <option value="Luxembourg">Luxembourg</option>
          <option value="Belgique">Belgique</option>
          <option value="Suisse">Suisse</option>
      </select>
    </div>
    <div>
      <label >Adresse mail</label>
      <input type="email" v-model="formUser.mail" />
    </div>
    <div>
      <label>Téléphone</label>
      <input type="text"  v-model="formUser.phone" />
    </div>
    <div v-if="mode === 'edit'">
      <label>Ancien mot de passe</label>
      <input type="password" v-model="formUser.oldPassword" />
    </div>
    <div>
      <label>Mot de passe</label>
      <input type="password"  v-model="formUser.password" />
    </div>
    <div>
      <label>Confirmation</label>
      <input type="password" v-model="formUser.confirm" />
    </div>

    <M2LButton v-bind:label="mode === 'new' ? 'Inscription' : 'Modifier le profil'" v-bind:action="onconfirm" />
  </form>
</div>
</template>

<script>
import M2LButton from '@/components/M2LButton';

export default {
  name: 'profil',
  props: ['mode', 'onConfirm', 'user'],
  created: function() {
    if(this.user) {
      let userCopy = Object.assign({}, this.user);
      userCopy.fullname = `${this.user.firstname} ${this.user.lastname}`;

      let addressFields = userCopy.address.split(' ');
      const number = addressFields[0];
      addressFields.shift()

      const type = addressFields[0];
      addressFields.shift()

      const address = addressFields.join(' ');

      userCopy.address = {
        number,
        type,
        address
      }

      userCopy.country = userCopy.country.charAt(0).toUpperCase() + userCopy.country.slice(1);

      this.formUser = userCopy;
    }
  }, 
  methods: {
    onconfirm: function() {
      let userCopy = {
        id: this.user ? this.user.id : undefined,
        firstname: this.user ? this.user.firstname : this.formUser.firstname,
        lastname: this.user ? this.user.lastname : this.formUser.lastname,
        address: [
          this.formUser.address.number, 
          this.formUser.address.type, 
          this.formUser.address.address
        ].join(' '),
        town: this.formUser.town,
        zip: this.formUser.zip,
        country: this.formUser.country,
        mail: this.formUser.mail,
        phone: this.formUser.phone,
        password: this.formUser.password,
        confirm: this.formUser.confirm,
        oldPassword: this.mode === 'edit' ? this.formUser.oldPassword : undefined,
      };
      
      this.onConfirm(userCopy);
    }
  },
  data () {
    return {
      title: this.mode === 'edit' ? 'Modifier le profil' : 'Inscription',
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
