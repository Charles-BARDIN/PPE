import { IIndexNavigationAccess } from './i-index-navigation-access.interface';
import { IIndexAuthAccess } from './i-index-auth-access.interface';

export class IndexStateService {
  private _nav: IIndexNavigationAccess
  private _auth: IIndexAuthAccess

  constructor(config: {
    navigationService: IIndexNavigationAccess,
    authService: IIndexAuthAccess
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