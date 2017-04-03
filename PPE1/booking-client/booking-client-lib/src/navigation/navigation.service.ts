import { IIndexNavAccess } from '../index-state';
import { IRegisterNavAccess } from '../register-state';
import { ILoginNavAccess } from '../login-state';
import { ILogoutNavAccess } from '../logout-state';

import { IRouter } from '.';
import { INavigationAuthAccess } from '.';

export class NavigationService implements IIndexNavAccess, IRegisterNavAccess, ILogoutNavAccess, ILoginNavAccess {
  private _router: IRouter;
  private _auth: INavigationAuthAccess;
  private _states: { name: string, appStates: string[] }[];
  private _menuItems: string[];

  constructor(config: {
    router: IRouter,
    authentification: INavigationAuthAccess
  }) {
    
    this._router = config.router;
    this._auth = config.authentification;
    this._states = [
      {
        name: 'index',
        appStates: [
          'connected',
          'not_connected'
        ]
      },
      {
        name: 'room',
        appStates: [
          'connected',
          'not_connected'
        ]
      },
      {
        name: 'login',
        appStates: [
          'not_connected'
        ]
      },
      {
        name: 'register',
        appStates: [
          'not_connected'
        ]
      },
      {
        name: 'booking',
        appStates: [
          'connected'
        ]
      },
      {
        name: 'profile',
        appStates: [
          'connected'
        ]
      },
      {
        name: 'logout',
        appStates: [
          'connected'
        ]
      }
    ]
    this._setMenuItems();
  }

  public goTo(stateName: string) {
    this._setMenuItems();
    let stateToGo = this._states.filter(state => state.name === stateName)[0];

    let isAKnownState = stateToGo != null;
    if(!isAKnownState) {
      this._router.go('index');
      return;
    }
    
    let isAuthorized = this._menuItems.indexOf(stateName) !== -1;
    if(!isAuthorized) {
      this._router.go('login');
      return;
    }

    this._router.go(stateName);
  }

  public onItemMenuClick(item: string) {
    this.goTo(item);
  }

  private _setMenuItems(){
    let appState = this._auth.userIsConnected() ? 'connected' : 'not_connected';
    if(!this._menuItems) {
      this._menuItems = [];
    }

    this._menuItems.splice(0);
    this._menuItems.push(
      ...this._states.filter(state => state.appStates.indexOf(appState) !== -1)
      .reduce((prev, curr) => {
        prev.push(curr.name);
        return prev;
      }, [])
    );
  }

  public getMenuItems(): string[] {
    return this._menuItems;
  }
};