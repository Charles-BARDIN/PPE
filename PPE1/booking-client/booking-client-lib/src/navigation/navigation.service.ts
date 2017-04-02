import { IIndexNavigationAccess } from '../index-state';
import { IRegisterNavigationAccess } from '../register-state';
import { ILoginNavAccess } from '../login-state';
import { ILogoutNavAccess } from '../logout-state';

import { IRouter } from './i-router.interface';
import { INavigationAuthAccess } from './i-navigation-auth-access.interface';

export class NavigationService implements IIndexNavigationAccess, IRegisterNavigationAccess, ILogoutNavAccess, ILoginNavAccess {
  private _router: IRouter
  private _auth: INavigationAuthAccess
  private _states: { name: string, appStates: string[] }[]

  constructor(config: {
    navTool: IRouter,
    authAccess: INavigationAuthAccess
  }) {
    this._router = config.navTool;
    this._auth = config.authAccess;
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
  }

  public goTo(stateName: string) {
    let appState = this._auth.userIsConnected() ? 'connected' : 'not_connected';
    let stateToGo = this._states.filter(state => state.name === stateName)[0];

    let isAKnownState = stateToGo != null;
    if(!isAKnownState) {
      this._router.go('index');
      return;
    }

    let isAuthorized = stateToGo.appStates.indexOf(appState) !== -1;
    if(!isAuthorized) {
      this._router.go('login');
      return;
    }

    this._router.go(stateName);
  }

  public onItemMenuClick(item: string) {
    this.goTo(item);
  }

  public getMenuItems(): string[]{
    let appState = this._auth.userIsConnected() ? 'connected' : 'not_connected';

    return this._states.filter(state => state.appStates.indexOf(appState) !== -1)
      .reduce((prev, curr) => {
        prev.push(curr.name);
        return prev;
      }, []);
  }
};