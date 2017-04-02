import { ILoginAuthAccess } from './i-login-auth-access.interface';
import { ILoginValidator } from './i-login-validator.interface';
import { ILoginController } from './i-login-controller.interface';
import { ILoginNavAccess } from './i-login-nav-access.interface';

export class LoginService {
  private _auth: ILoginAuthAccess;
  private _nav: ILoginNavAccess;
  private _validator: ILoginValidator;
  private _controller: ILoginController;

  constructor(config: {
    authService: ILoginAuthAccess,
    navService: ILoginNavAccess,
    validator: ILoginValidator,
    controller: ILoginController
  }) {
    this._auth = config.authService;
    this._nav = config.navService;
    this._validator = config.validator;
    this._controller = config.controller;
  }

  public login(credentials: { mail: string, password: string }) {
    let errors = [];

    if(!credentials.mail || ! this._validator.validateMail(credentials.mail)) {
      errors.push('ERR_LOGIN_MAIL_FORMAT');
    }

    if(!credentials.password) {
      errors.push('ERR_LOGIN_PASSWORD_REQUIRED');
    }

    if(errors.length) {
      this._controller.showValidationErrors(errors);
      return;
    }

    this._auth.login(credentials)
      .then(res => this._nav.goTo('booking'))
      .catch(err => this._controller.showBackendError(err))
  }
}