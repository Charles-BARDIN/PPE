import { INavigationAccess } from './i-navigation-access.interface';
import { IAuthAccess } from './i-auth-access.interface';

export class IndexStateService {
  private _nav: INavigationAccess
  private _auth: IAuthAccess

  constructor(config: {
    navigationService: INavigationAccess,
    authService: IAuthAccess
  }) {
    this._nav = config.navigationService;
    this._auth = config.authService;
  }

  public goToBookingState(): void {
    if(this._auth.userIsConnected()) {
      this._nav.goTo('booking');
    } else {
      this._nav.goTo('login');
    }
  }
}