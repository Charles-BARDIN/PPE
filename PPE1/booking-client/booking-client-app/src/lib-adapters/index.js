const lib = require('booking-client-lib');

import router from '@/router';

const stateTranslator = {
  booking: 'booking',
  index: '/',
  room: 'room',
  register: 'register',
  profil: 'profil',
  login: 'login',
  logout: 'logout',

};

const libRouter = {
  go: state => router.push(stateTranslator[state])
};

const gateway = new lib.ServerGateway({

});

const authService = new lib.AuthService({
  authGateway: gateway
});

const navigationService = new lib.NavigationService({
  navTool: libRouter,
  authAccess: authService
});

const indexStateService = new lib.IndexStateService({
  navigationService,
  authService
});

export {
  authService,
  navigationService,
  indexStateService
};