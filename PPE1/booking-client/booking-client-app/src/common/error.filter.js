const errors = {
  // Network
  ERR_NETWORK: 'Une erreur inconnue est arrivée',
  ERR_GATEWAY_ANSWER_FORMAT: 'Une erreur inconnue est arrivée',

  // Booking
  ERR_BOOKING_ROOM_REQUIRED: 'Veuillez choisir une salle',
  ERR_BOOKING_DATE_REQUIRED: 'Veuillez choisir une date',
  ERR_BOOKING_DATE_PASSED: 'La date sélectionnée est passée',
  ERR_BOOKING_USER_AUTH: 'Vous n\'êtes pas identifié',

  // Login
  ERR_LOGIN_MAIL_FORMAT: 'Le mail n\'est pas au bon format',
  ERR_LOGIN_PASSWORD_REQUIRED: 'Veuillez remplir le champs mot de passe',

  // Profil
  ERR_MODIFYUSER_MAIL_FORMAT: 'Le mail n\'est pas au bon format',
  ERR_MODIFYUSER_OLDPASSWORD_REQUIRED: 'Veuillez entrer votre ancien mot de passe',
  ERR_MODIFYUSER_PASSWORD_MATCH: 'Le mot de passe et la confirmation ne sont pas identiques',

  // Register
  ERR_REGISTER_LASTNAME_REQUIRED: 'Veuillez renseigner votre nom de famille',
  ERR_REGISTER_FIRSTNAME_REQUIRED: 'Veuillez renseigner votre prénom',
  ERR_REGISTER_ADDRESS_REQUIRED: 'Veuillez renseigner votre adresse',
  ERR_REGISTER_TOWN_REQUIRED: 'Veuillez renseigner votre ville',
  ERR_REGISTER_ZIP_REQUIRED: 'Veuillez renseigner votre code postal',
  ERR_REGISTER_COUNTRY_REQUIRED: 'Veuillez renseigner votre pays',
  ERR_REGISTER_MAIL_FORMAT: 'Le mail n\'est pas au bon format',
  ERR_REGISTER_PASSWORD_REQUIRED: 'Veuillez renseigner votre mot de passe',
  ERR_REGISTER_PASSWORD_MATCH: 'Le mot de passe et la confirmation ne sont pas identiques'
};

export default input => {
  return errors[input] || 'Une erreur inconnue est arrivée';
};