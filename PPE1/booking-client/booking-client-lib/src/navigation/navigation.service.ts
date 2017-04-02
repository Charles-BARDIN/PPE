import { IRouter } from './i-router.interface';
import { INavigationAuthAccess } from './i-navigation-auth-access.interface';

export class NavigationService {
  private _router: IRouter
  private _auth: INavigationAuthAccess

  constructor(config: {
    navTool: IRouter,
    authAccess: INavigationAuthAccess
  }) {
    
  }
};