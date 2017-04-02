import { IIndexNavAccess } from '.';
import { IIndexAuthAccess } from '.';

export class IndexService {
  private _nav: IIndexNavAccess
  private _auth: IIndexAuthAccess

  constructor(config: {
    navigation: IIndexNavAccess,
    authentification: IIndexAuthAccess
  }) {
    this._nav = config.navigation;
    this._auth = config.authentification;
  }

  public goToBookingState(): void {
    if(this._auth.userIsConnected()) {
      this._nav.goTo('booking');
    } else {
      this._nav.goTo('login');
    }
  }
}