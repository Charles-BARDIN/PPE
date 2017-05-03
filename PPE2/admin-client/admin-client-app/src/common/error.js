const DEFAULT_MESSAGE = "Une erreur inconnue est arrivée";

const errors = {
  // Login
  ERR_LOGIN_MAIL_FORMAT: "Veuillez renseigner une adresse email valide",
  ERR_LOGIN_PASSWORD_REQUIRED: "Le mot de passe doit être précisé",
  INVALID_CREDENTIALS: "La combinaison mail/mot de passe ne correspond pas",

  // Room
  ERR_EDITROOM_DESCRIPTION_REQUIRED: "La description de la salle doit être renseignée",
  ERR_EDITROOM_NAME_REQUIRED: "Le nom de la salle doit être renseignée",
  ERR_NEWROOM_DESCRIPTION_REQUIRED: "La description doit être renseignée",
  ERR_NEWROOM_NAME_REQUIRED: "Le nom de la salle doit être renseignée",

  // Booking
  ERR_ROOM_BOOKED: "Erreur, il existe une réservation pour cette salle"
};


export {
  errors,
  DEFAULT_MESSAGE
};