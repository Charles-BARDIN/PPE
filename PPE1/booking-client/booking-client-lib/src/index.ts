import { BookingService, IBookingGateway, IBookingController } from './booking-state';
import { IndexService } from './index-state';
import { LoginService, ILoginController, ILoginValidator } from './login-state';
import { LogoutService } from './logout-state';
import { ProfileService, IProfileController, IProfileValidator } from './profile-state';
import { RegisterService, IRegisterController, IRegisterValidator } from './register-state';
import { RoomService, IRoomGateway, IRoomController } from './room-list-state';
import { AuthService, IAuthGateway } from './session';
import { NavigationService, IRouter } from './navigation';

export interface IGateway extends IAuthGateway, IBookingGateway, IRoomGateway { };
export interface IValidator extends ILoginValidator, IProfileValidator, IRegisterValidator { };

export {
  IBookingController,
  ILoginController,
  IProfileController,
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
  private _profileService: ProfileService;
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
  
  public getRouter(): IRouter {
    return this._router;
  };

  public getAuthService(): AuthService {
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

  public getBookingService(): BookingService {
    if (this._bookingService instanceof BookingService) {
      return this._bookingService;
    }

    if (!this._gateway) {
      console.error('A gateway must be set');
    }

    this._bookingService = new BookingService({
      authentification: this.getAuthService(),
      gateway: this._gateway,
      navigation: this.getNavigationService()
    });

    return this._bookingService;
  }

  public getIndexService(): IndexService {
    if (this._indexService instanceof IndexService) {
      return this._indexService;
    }

    this._indexService = new IndexService({
      navigation: this.getNavigationService(),
      authentification: this.getAuthService()
    });

    return this._indexService;
  }

  public getLoginService(): LoginService {
    if (this._loginService instanceof LoginService) {
      return this._loginService;
    }

    this._loginService = new LoginService({
      authentification: this.getAuthService(),
      navigation: this.getNavigationService()
    });

    return this._loginService;
  }

  public getLogoutService(): LogoutService {
    if (this._logoutService instanceof LogoutService) {
      return this._logoutService;
    }

    this._logoutService = new LogoutService({
      authentification: this.getAuthService(),
      navigation: this.getNavigationService()
    });

    return this._logoutService;
  }

  public getProfileService(): ProfileService {
    if (this._profileService instanceof ProfileService) {
      return this._profileService;
    }

    this._profileService = new ProfileService({
      authentification: this.getAuthService()
    });

    return this._profileService;
  }

  public getRegisterService(): RegisterService {
    if (this._registerService instanceof RegisterService) {
      return this._registerService;
    }

    this._registerService = new RegisterService({
      navigation: this.getNavigationService()
    });

    return this._registerService;
  }

  public getRoomService(): RoomService {
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

  public setGateway(gateway: IGateway) {
    this._gateway = gateway;
  }

  public setHash(hash: Function) {
    this._hash = hash;
  }

  public setRouter(router: IRouter) {
    this._router = router;
  }

  public getNavigationService(): NavigationService {
    if (this._navigationService instanceof NavigationService) {
      return this._navigationService;
    }

    this._navigationService = new NavigationService({
      router: this._router,
      authentification: this.getAuthService()
    });

    return this._navigationService;
  }
}
