import {IBookingCancelNavAccess} from '../booking-cancel-state';
import {IBookingNavAccess} from '../booking-state';
import {ILoginNavAccess} from '../login-state';
import {ILogoutNavAccess} from '../logout-state';
import {IRoomDeleteNavAccess} from '../room-delete-state';
import {IRoomEditNavAccess} from '../room-edit-state';
import {IRoomNewNavAccess} from '../room-new-state';
import {IRoomNavAccess} from '../room-state';

import { IRouter } from '.';
import { INavigationAuthAccess } from '.';

export class NavigationService implements IBookingCancelNavAccess, IBookingNavAccess, ILoginNavAccess, ILogoutNavAccess, IRoomDeleteNavAccess, IRoomEditNavAccess, IRoomNewNavAccess, IRoomNavAccess {
  private _router: IRouter;
  private _auth: INavigationAuthAccess;
  private _states: { name: string, protected: boolean }[];
  private _data: any;

  constructor(config: {
    router: IRouter,
    authentification: INavigationAuthAccess
  }) {
    this._router = config.router;
    this._auth = config.authentification;
    this._states = [
      {
        name: 'login',
        protected: false
      },
      {
        name: 'logout',
        protected: true
      },
      {
        name: 'rooms',
        protected: true
      },
      {
        name: 'new-room',
        protected: true
      },
      {
        name: 'edit-room',
        protected: true
      },
      {
        name: 'delete-room',
        protected: true
      },
      {
        name: 'bookings',
        protected: true
      },
      {
        name: 'cancel-booking',
        protected: true
      },
    ];
  }

  get menuItems(): string[] {
    const isConnected = this._auth.userIsConnected();
    return this._states.filter(state => state.protected === isConnected)
      .map(state => state.name);
  }

  public goTo(stateName: string, data?: any) {
    this._data = data;
    let stateToGo = this._states.filter(state => state.name === stateName)[0];

    const authorized = stateToGo && stateToGo.protected === this._auth.userIsConnected();
    if (!authorized) {
      this._router.go('login');
      return;
    }

    this._router.go(stateName);
  }

  public getRouteParameters(): any {
    return this._data;
  }
};