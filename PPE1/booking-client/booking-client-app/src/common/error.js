const DEFAULT_MESSAGE = "Une erreur inconnue est arrivée";
const MAIL_FORMAT_MESSAGE = "Le mail n'est pas au bon format";
const PASSWORD_REQUIRED_MESSAGE = "Veuillez renseigner votre mot de passe";
const CONFIRM_MATCH_MESSAGE = "Le mot de passe et la confirmation ne sont pas identiques";

const errors = {
  // Network
  ERR_NETWORK: DEFAULT_MESSAGE,
  ERR_GATEWAY_ANSWER_FORMAT: DEFAULT_MESSAGE,

  // Booking
  ERR_BOOKING_ROOM_REQUIRED: "Veuillez renseigner une salle",
  ERR_BOOKING_DATE_REQUIRED: "Veuillez renseigner une date",
  ERR_BOOKING_DATE_PASSED: "La date sélectionnée est passée",
  ERR_BOOKING_USER_AUTH: "Vous n'êtes pas identifié",
  ERR_ROOM_ALREADY_BOOKED: "Cette salle est déjà réservée à cette date",

  // Login
  ERR_LOGIN_MAIL_FORMAT: MAIL_FORMAT_MESSAGE,
  ERR_LOGIN_PASSWORD_REQUIRED: PASSWORD_REQUIRED_MESSAGE,
  INVALID_CREDENTIALS: "Le mail et le mot de passe ne correspondent pas",

  // Profil
  ERR_MODIFYUSER_MAIL_FORMAT: MAIL_FORMAT_MESSAGE,
  ERR_MODIFYUSER_OLDPASSWORD_REQUIRED: "Veuillez renseigner votre ancien mot de passe",
  ERR_MODIFYUSER_PASSWORD_MATCH: CONFIRM_MATCH_MESSAGE,
  ERR_MODIFYUSER_MAIL_TAKEN: "Ce mail est déjà pris",

  // Register
  ERR_REGISTER_LASTNAME_REQUIRED: "Veuillez renseigner votre nom de famille",
  ERR_REGISTER_FIRSTNAME_REQUIRED: "Veuillez renseigner votre prénom",
  ERR_REGISTER_ADDRESS_REQUIRED: "Veuillez renseigner votre adresse",
  ERR_REGISTER_TOWN_REQUIRED: "Veuillez renseigner votre ville",
  ERR_REGISTER_ZIP_REQUIRED: "Veuillez renseigner votre code postal",
  ERR_REGISTER_COUNTRY_REQUIRED: "Veuillez renseigner votre pays",
  ERR_REGISTER_MAIL_FORMAT: MAIL_FORMAT_MESSAGE,
  ERR_REGISTER_PASSWORD_REQUIRED: PASSWORD_REQUIRED_MESSAGE,
  ERR_REGISTER_PASSWORD_MATCH: CONFIRM_MATCH_MESSAGE,
  ERR_REGISTER_MAIL_TAKEN: "Ce mail est déjà pris",

  // Room
  ERR_DB_ROOM_NOT_FOUND: "La liste des salles n'a pas pu être récupérée"
};


export {
  errors,
  DEFAULT_MESSAGE
};