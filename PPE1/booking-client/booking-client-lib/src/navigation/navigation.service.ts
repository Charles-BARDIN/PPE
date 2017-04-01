import { IRouter } from './i-router.interface';
import { IAuthAccess } from './i-auth-access.interface';

export class NavigationService {
  private _router: IRouter
  private _auth: IAuthAccess

  constructor(config: {
    navTool: IRouter,
    authAccess: IAuthAccess
  }) {
    
  }
};