import { BookingService, IBookingGateway, IBookingController } from './booking-state';
import { IndexService } from './index-state';
import { LoginService, ILoginController, ILoginValidator } from './login-state';
import { LogoutService } from './logout-state';
import { ProfilService, IProfilController, IProfilValidator } from './profil-state';
import { RegisterService, IRegisterController, IRegisterValidator } from './register-state';
import { RoomService, IRoomGateway, IRoomController } from './room-state';
import { AuthService, IAuthGateway } from './authentification';
import { NavigationService, IRouter } from './navigation';

export interface IGateway extends IAuthGateway, IBookingGateway, IRoomGateway { };
export interface IValidator extends ILoginValidator, IProfilValidator, IRegisterValidator { };

export {
  IBookingController,
  ILoginController,
  IProfilController,
  IRegisterController,
  IRoomController,

  IRouter
};

export class BookingClientLib {
  private _hash: Function;
  private _gateway: IGateway;
  private _router: IRouter;

  private _authService: AuthService;
  private _bookingService: BookingService;
  private _indexService: IndexService;
  private _loginService: LoginService;
  private _logoutService: LogoutService;
  private _profilService: ProfilService;
  private _registerService: RegisterService;
  private _roomService: RoomService;

  private _navigationService: NavigationService;

  constructor(config?: {
    hash?: Function,
    router?: IRouter,
    gateway?: IGateway
  }) {
    if(!config) return;
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

  get bookingService(): BookingService {
    if (this._bookingService instanceof BookingService) {
      return this._bookingService;
    }

    if (!this._gateway) {
      console.error('A gateway must be set');
    }

    this._bookingService = new BookingService({
      authentification: this.authService,
      gateway: this._gateway,
      navigation: this.navigationService
    });

    return this._bookingService;
  }

  get indexService(): IndexService {
    if (this._indexService instanceof IndexService) {
      return this._indexService;
    }

    this._indexService = new IndexService({
      navigation: this.navigationService,
      authentification: this.authService
    });

    return this._indexService;
  }

  get loginService(): LoginService {
    if (this._loginService instanceof LoginService) {
      return this._loginService;
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

    this._logoutService = new LogoutService({
      authentification: this.authService,
      navigation: this.navigationService
    });

    return this._logoutService;
  }

  get profilService(): ProfilService {
    if (this._profilService instanceof ProfilService) {
      return this._profilService;
    }

    this._profilService = new ProfilService({
      authentification: this.authService,
      navigation: this.navigationService
    });

    return this._profilService;
  }

  get registerService(): RegisterService {
    if (this._registerService instanceof RegisterService) {
      return this._registerService;
    }

    this._registerService = new RegisterService({
      navigation: this.navigationService,
      authentification: this.authService
    });

    return this._registerService;
  }

  get roomService(): RoomService {
    if (this._roomService instanceof RoomService) {
      return this._roomService;
    }

    if (!this._gateway) {
      console.error('A gateway must be set');
    }

    this._roomService = new RoomService({
      gateway: this._gateway
    });

    return this._roomService;
  }

  get navigationService(): NavigationService {
    if (this._navigationService instanceof NavigationService) {
      return this._navigationService;
    }

    this._navigationService = new NavigationService({
      router: this._router,
      authentification: this.authService
    });

    return this._navigationService;
  }

  set gateway(gateway: IGateway) {
    this._gateway = gateway;
  }

  set hash(hash: Function) {
    this._hash = hash;
  }

  set router(router: IRouter) {
    this._router = router;
  }
}
