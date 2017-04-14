<template>
  <div>
    <M2LTitle>Login</M2LTitle>
    <form>
      <div>
        <label>Mail</label>
        <input type="mail" v-model="mail" required />
      </div>

      <div>
        <label>Mot de passe</label>
        <input type="password" v-model="password" required />
      </div>

      <Error>
        <div v-for="error in errors">
          {{ error }}
        </div>
      </Error>

      <div class="modal-footer">
        <M2LButton label="OK" class="button" v-bind:action="onlogin" />
      </div>
    </form>
  </div>
</template>

<script>
import M2LButton from '@/components/M2LButton'
import M2LTitle from '@/components/M2LTitle'
import Error from '@/components/Error'

import adminClientLib from '@/lib-adapters'

const loginService = adminClientLib.loginService;

export default {
  name: 'login',
  created: function() {
    const controller = {
      showValidationErrors: this.showValidationErrors,
      showBackendErrors: this.showBackendErrors
    };

    const validator = {
      validateMail
    };

    loginService.controller = controller;
    loginService.validator = validator;
  },
  data () {
    return {
      mail: '',
      password: '',
      errors: []
    }
  },
  components: {
    M2LButton,
    M2LTitle,
    Error
  },
  methods: {
    onlogin: function() {
      loginService.login({ mail: this.mail, password: this.password });
    },
    showValidationErrors,
    showBackendErrors
  }
}

function showValidationErrors(errors) {
  this.errors = errors;
}

function showBackendErrors(errors) {
  this.errors = errors;
}

function validateMail(mail) {
  return mail.match(/^(.)+@(.)+\.(.)+$/);
}
</script>

<style scoped>
label {
  display: inline-block;
  width: 110px;
  text-align: left;
}

form {
  margin-top: 50px;
}

form div {
  padding: 6px;
}
</style>
