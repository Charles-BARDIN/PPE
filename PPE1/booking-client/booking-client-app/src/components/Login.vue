<template>
  <div v-if="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              Connexion
            </div>

            <div class="modal-body">
              <form>
                <div>
                  <label>Mail</label>
                  <input type="mail" v-model="mail" required />
                </div>

                <div>
                  <label>Mot de passe</label>
                  <input type="password" v-model="password" required />
                </div>
              </form>
            </div>

            <Error>
              <div v-for="err in errors">{{ err | error }}</div>
            </Error>

            <div class="modal-footer">
              <M2LButton label="Annuler" class="button" v-bind:action="oncancel" />
              <M2LButton label="OK" class="button" v-bind:action="onlogin" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import bookingClientLib from '@/lib-adapter'
  import M2LButton from '@/components/M2LButton'
  import Error from '@/components/Error'

  const loginService = bookingClientLib.loginService;
  
  export default {
    name: 'login',
    props: ['showModal', 'onCancel'],
    created: function () {
      const validateMail = this.validateMail;
      const showValidationErrors = this.showValidationErrors;
      const showBackendError = this.showBackendError;

      const controller = {
        showValidationErrors,
        showBackendError
      };
      const validator = {
        validateMail
      };

      loginService.controller = controller;
      loginService.validator = validator;
    },
    methods: {
      onlogin: function() {
        const credentials = { mail: this.mail, password: this.password };

        this.mail = '';
        this.password = '';
        this.errors = [];

        loginService.login(credentials);
      },
      oncancel: function() {
        this.mail = '';
        this.password = '';
        this.errors = [];

        this.onCancel();
      },
      validateMail: function(mail) {
        return mail.match(/^(.)+@(.)+\.(.)+$/);
      },
      showValidationErrors: function(errors) {
        this.errors = errors;
      },
      showBackendError: function(error) {
        this.errors = [error];
      }
    },
    data () {
      return {
        errors: [],
        mail: '',
        password: ''
      };
    },
    components: {
      M2LButton,
      Error,
    }
  };
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 310px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin-top: 20px;
}

.modal-footer {
  text-align: right;
}

label {
  display: inline-block;
  width: 110px;
  text-align: left;
}

form div {
  padding: 6px;
}

.button {
  margin-left: 10px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>