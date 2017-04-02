import lib from 'booking-client-lib';

const gateway = new lib.ServerGateway({

});

const authService = new lib.AuthService({
  authGateway: gateway
});

const navigationService = new lib.NavigationService({
  navTool: router,
  authAccess: authService
});

const indexStateService = new lib.IndexStateService({
  navigationService,
  authService
});