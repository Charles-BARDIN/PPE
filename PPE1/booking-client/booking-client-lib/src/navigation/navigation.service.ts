import { IIndexNavigationAccess } from '../index-state';

import { IRouter } from './i-router.interface';
import { INavigationAuthAccess } from './i-navigation-auth-access.interface';

export class NavigationService implements IIndexNavigationAccess{
  private _router: IRouter
  private _auth: INavigationAuthAccess

  constructor(config: {
    navTool: IRouter,
    authAccess: INavigationAuthAccess
  }) {
    this._router = config.navTool;
    this._auth = config.authAccess;
  }

  public goTo(state: string) {
    this._router.go(state);
  }

  public getMenuItems(): {
    label: string,
    action: Function
  }[] {
    return this._auth.userIsConnected()
      ? [
        {
          label: 'Acceuil',
          action: () => {
            this.goTo('index')
          }
        },
        {
          label: 'Salles',
          action: () => {
            this.goTo('room')
          }
        },
        {
          label: 'Réservation',
          action: () => {
            this.goTo('booking')
          }
        },
        {
          label: 'Profile',
          action: () => {
            this.goTo('profile')
          }
        },
        {
          label: 'Déconnexion',
          action: () => {
            this.goTo('logout')
          }
        },
      ]
      : [
        {
          label: 'Acceuil',
          action: () => {
            this.goTo('index')
          }
        },
        {
          label: 'Salles',
          action: () => {
            this.goTo('room')
          }
        },
        {
          label: 'Connexion',
          action: () => {
            this.goTo('login')
          }
        },
        {
          label: 'Inscription',
          action: () => {
            this.goTo('register')
          }
        }
      ]
  }
};