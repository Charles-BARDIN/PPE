<template>
  <Profile mode="edit" v-bind:onConfirm="editUser" v-bind:user="user" />
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
      const hideErrors = this.hideErrors;
      const showValidationErrors = this.showValidationErrors;
      const showBackendError = this.showBackendError;
      const setUserProfile = this.setUserProfile;
      const showModifyConfirmation = this.showModifyConfirmation;

      const validator = {
        isMail
      };
      const controller = {
        hideErrors,
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
      editUser: () => {
        profileService.modifyUser(this.user);
      },
      isMail: function(mail) {
        return mail.match(/^(.)+@.+\.(.)+$/);
      },
      hideErrors: function() {
        this.errors = [];
      },
      showValidationErrors: function(errors) {
        this.errors = errors;
      },
      showBackendError: function(err) {
        this.errors = [err];
      },
      setUserProfile: function(user) {
        console.log(user)
        this.user = user
      },
      showModifyConfirmation: function() {

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