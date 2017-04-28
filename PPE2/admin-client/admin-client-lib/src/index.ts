import { AuthService, IAuthGateway } from './authentification';
import { BookingCancelService, IBookingCancelGateway, IBookingCancelController } from './booking-cancel-state';
import { BookingService, IBookingGateway, IBookingController } from './booking-state';
import { LoginService, ILoginController, ILoginValidator } from './login-state';
import { LogoutService } from './logout-state';
import { NavigationService, IRouter } from './navigation';
import { RoomDeleteService, IRoomDeleteGateway, IRoomDeleteController } from './room-delete-state';
import { RoomEditService, IRoomEditController, IRoomEditGateway } from './room-edit-state';
import { RoomNewService, IRoomNewController, IRoomNewGateway } from './room-new-state';
import { RoomService, IRoomController, IRoomGateway } from './room-state';

export interface IGateway extends IAuthGateway, IBookingCancelGateway, IBookingGateway, IRoomDeleteGateway, IRoomEditGateway, IRoomNewGateway, IRoomGateway { };
export interface IValidator extends ILoginValidator { };

export {
  IBookingCancelController,
  IBookingController,
  ILoginController,
  IRoomDeleteController,
  IRoomEditController,
  IRoomNewController,
  IRoomController,

  IRouter
}

export class AdminClientLib {
  private _hash: (val: string) => string;
  private _gateway: IGateway;
  private _router: IRouter;

  private _authService: AuthService;
  private _bookingCancelService: BookingCancelService;
  private _bookingService: BookingService;
  private _loginService: LoginService;
  private _logoutService: LogoutService;
  private _roomDeleteService: RoomDeleteService;
  private _roomEditService: RoomEditService;
  private _roomNewService: RoomNewService;
  private _roomService: RoomService;

  private _navigationService: NavigationService;

  constructor(config?: {
    hash?: (val: string) => string,
    router?: IRouter,
    gateway?: IGateway
  }) {
    if (!config) return;
    this._hash = config.hash;
    this._router = config.router;
    this._gateway = config.gateway;
  }

  get router(): IRouter {
    return this._router;
  };

  get authService(): AuthService {
    if (this._authService instanceof AuthService) {
      return this._authService;
    }

    if (!this._gateway) {
      console.error('A gateway must be set');
    }

    this._authService = new AuthService({
      gateway: this._gateway,
      hash: this._hash
    });

    return this._authService;
  }

  get bookingCancelService(): BookingCancelService {
    if (this._bookingCancelService instanceof BookingCancelService) {
      return this._bookingCancelService;
    }

    if (!this._gateway) {
      console.error('A gateway must be set');
    }

    this._bookingCancelService = new BookingCancelService({
      navigation: this.navigationService,
      gateway: this._gateway,
      authentification: this.authService,
      bookingService: this.bookingService
    });

    return this._bookingCancelService;
  }

  get bookingService(): BookingService {
    if (this._bookingService instanceof BookingService) {
      return this._bookingService;
    }

    if (!this._gateway) {
      console.error('A gateway must be set');
    }

    this._bookingService = new BookingService({
      navigation: this.navigationService,
      gateway: this._gateway,
      authentification: this.authService
    });

    return this._bookingService;
  }

  get navigationService(): NavigationService {
    if (this._navigationService instanceof NavigationService) {
      return this._navigationService;
    }

    if (!this._gateway) {
      console.error('A gateway must be set');
    }

    this._navigationService = new NavigationService({
      router: this._router,
      authentification: this.authService
    });

    return this._navigationService;
  }

  get loginService(): LoginService {
    if (this._loginService instanceof LoginService) {
      return this._loginService;
    }

    if (!this._gateway) {
      console.error('A gateway must be set');
    }

    this._loginService = new LoginService({
      authentification: this.authService,
      navigation: this.navigationService
    });

    return this._loginService;
  }

  get logoutService(): LogoutService {
    if (this._logoutService instanceof LogoutService) {
      return this._logoutService;
    }

    if (!this._gateway) {
      console.error('A gateway must be set');
    }

    this._logoutService = new LogoutService({
      authentification: this.authService,
      navigation: this.navigationService
    });

    return this._logoutService;
  }

  get roomDeleteService(): RoomDeleteService {
    if (this._roomDeleteService instanceof RoomDeleteService) {
      return this._roomDeleteService;
    }

    if (!this._gateway) {
      console.error('A gateway must be set');
    }

    this._roomDeleteService = new RoomDeleteService({
      gateway: this._gateway,
      navigation: this.navigationService,
      authentification: this._authService,
      bookingService: this.bookingService
    });

    return this._roomDeleteService;
  }

  get roomEditService(): RoomEditService {
    if (this._roomEditService instanceof RoomEditService) {
      return this._roomEditService;
    }

    if (!this._gateway) {
      console.error('A gateway must be set');
    }

    this._roomEditService = new RoomEditService({
      gateway: this._gateway,
      navigation: this.navigationService,
      authentification: this._authService
    });

    return this._roomEditService;
  }

  get roomNewService(): RoomNewService {
    if (this._roomNewService instanceof RoomNewService) {
      return this._roomNewService;
    }

    if (!this._gateway) {
      console.error('A gateway must be set');
    }

    this._roomNewService = new RoomNewService({
      gateway: this._gateway,
      navigation: this.navigationService,
      authentification: this._authService
    });

    return this._roomNewService;
  }

  get roomService(): RoomService {
    if (this._roomService instanceof RoomService) {
      return this._roomService;
    }

    if (!this._gateway) {
      console.error('A gateway must be set');
    }

    this._roomService = new RoomService({
      gateway: this._gateway,
      navigation: this.navigationService,
      authentification: this._authService
    });

    return this._roomService;
  }

  set gateway(gateway: IGateway) {
    this._gateway = gateway;
  }

  set hash(hash: (val: string) => string) {
    this._hash = hash;
  }

  set router(router: IRouter) {
    this._router = router;
  }
};
