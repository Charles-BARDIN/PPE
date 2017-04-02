const lib = require('booking-client-lib');

import router from '@/router';

const stateTranslator = {
  index: '/',
  booking: 'booking',
  room: 'room',
  register: 'register',
  profil: 'profil',
  login: 'login',
  logout: 'logout',
};

const gateway = new lib.ServerGateway();
const hash = input => input;

const authentification = new lib.AuthService({
  gateway,
  hash
});

const bookingService = new lib.BookingService({
  authentification,
  gateway,
  controller
});

const indexService = new lib.IndexService({
  navigation,
  authentification
});

const loginService = new lib.LoginService({
  authentification,
  navigation,
  validator,
  controller
});

const logoutService = new lib.LogoutService({
  authentification,
  navigation
});

const profileService = new lib.ProfileService({
  controller,
  authentification,
  validator
});

const registerService = new lib.RegisterService({
  validator,
  controller,
  navigation
});

const roomListService = new lib.RoomService({
  gateway,
  controller
});

export {};