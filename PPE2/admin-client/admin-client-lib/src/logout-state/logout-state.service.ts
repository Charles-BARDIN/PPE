import { ILogoutAuthAccess } from '.';
import { ILogoutNavAccess } from '.';

export class LogoutService {
  private _auth: ILogoutAuthAccess;
  private _nav: ILogoutNavAccess;

  constructor(config: {
    authentification: ILogoutAuthAccess,
    navigation: ILogoutNavAccess,
  }) {
    this._auth = config.authentification;
    this._nav = config.navigation;
  }

  public logout() {
    this._auth.logout()
      .then(res => this._nav.goTo('login'))
      .catch(err => this._nav.goTo('login'));
  }
}