const lib = require('booking-client-lib');

import router from '@/router';

const stateTranslator = {
  booking: 'reservation',
  index: '/',
  room: 'salle',
  register: 'inscription',
  profile: 'profile',
  // TODO: change
  login: 'connxion',
  logout: 'deconnexion',

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