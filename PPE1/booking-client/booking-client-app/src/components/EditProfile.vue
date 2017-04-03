<template>
  <div>
    <Profile mode="edit" v-bind:onConfirm="editUser" v-bind:user="user" />

    <div v-if="showConfirm">
      Profil modifié avec succès !
    </div>
    <div v-for="err in errors">
      {{ err }}
    </div>
  </div>
</template>

<script>
  import M2LButton from '@/components/M2LButton'
  import Profile from '@/components/Profile'
  
  import bookingClientLib from '@/lib-adapter'

  const profileService = bookingClientLib.getProfileService();

  export default {
    name: 'register',
    created: function() {
      const isMail = this.isMail;
      const hideTexts = this.hideTexts;
      const showValidationErrors = this.showValidationErrors;
      const showBackendError = this.showBackendError;
      const setUserProfile = this.setUserProfile;
      const showModifyConfirmation = this.showModifyConfirmation;

      const validator = {
        isMail
      };
      const controller = {
        hideTexts,
        showValidationErrors,
        showBackendError,
        setUserProfile,
        showModifyConfirmation,
      };

      profileService.validator = validator;
      profileService.controller = controller;

      profileService.onPageLoad();
    },
    methods: {
      editUser: user => {
        profileService.modifyUser(user);
      },
      isMail: function(mail) {
        return mail.match(/^(.)+@.+\.(.)+$/);
      },
      hideTexts: function() {
        this.errors = [];
        this.showConfirm = false;
      },
      showValidationErrors: function(errors) {
        this.errors = errors;
      },
      showBackendError: function(err) {
        this.errors = [err];
      },
      setUserProfile: function(user) {
        this.user = user
      },
      showModifyConfirmation: function() {
        this.showConfirm = true;
      }
    },
    components: {
      M2LButton,
      Profile
    },
    data () {
      return {
        errors: [],
        user: {},
        showConfirm: false
      };
    }
  }
</script>

<style scoped>
</style>