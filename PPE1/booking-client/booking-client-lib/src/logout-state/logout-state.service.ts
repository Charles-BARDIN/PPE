import { ILogoutAuthAccess } from './i-logout-auth-access.interface';
import { ILogoutNavAccess } from './i-logout-nav-access.interface';

export class LogoutService {
  private _auth: ILogoutAuthAccess;
  private _nav: ILogoutNavAccess;

  constructor(config: {
    authService: ILogoutAuthAccess,
    navService: ILogoutNavAccess,
  }) {
    this._auth = config.authService;
    this._nav = config.navService;
  }

  public logout() {
    this._auth.logout()
      .then(res => this._nav.goTo('index'))
      .catch(err => this._nav.goTo('index'));
  }
}