import { IProfileController } from './i-profile-controller.interface'
import { IProfileAuthAccess } from './i-profile-auth-access.interface'
import { IProfileValidator } from './i-profile-validator.interface'

export class ProfileService {
  private _controller: IProfileController;
  private _auth: IProfileAuthAccess;
  private _validator: IProfileValidator;

  constructor(config: {
    controller: IProfileController,
    authService: IProfileAuthAccess,
    validator: IProfileValidator
  }) {
    this._auth = config.authService;
    this._controller = config.controller;
    this._validator = config.validator;
  }

  public onPageLoad() {
    this._controller.setUserProfile(this._auth.getUser());
  }

  public modifyUser(modifiedUser: {
    id: number,
    address?: string,
    town?: string,
    zip?: string,
    country?: string,
    mail?: string,
    password?: string,
    confirm?: string,
    phone?: string
  }) {
    this._controller.hideErrors();

    let validation = this._validateUserModification(modifiedUser);

    if (!validation.valid) {
      this._controller.showValidationErrors(validation.faults);
      return;
    }

    this._auth.modifyUser(modifiedUser)
      .then(user => {
        this._controller.showModifyConfirmation();
      })
      .catch((err: string) => {
        this._controller.showBackendError(err);
      });
  }

  private _validateUserModification(user: {
    id: number,
    address?: string,
    town?: string,
    zip?: string,
    country?: string,
    mail?: string,
    password?: string,
    confirm?: string,
    phone?: string
  }): { valid: boolean, faults: string[] } {
    let res = {
      valid: true,
      faults: []
    };

    for (let property in user) {
      switch (property) {
        case 'mail':
          if (user[property] && !this._validator.isMail(user[property])) {
            res.valid = false;
            res.faults.push('ERR_MODIFYUSER_MAIL_FORMAT');
          }
          break;
      }
    }

    if (user.password && user.password !== user.confirm) {
      res.valid = false;
      res.faults.push('ERR_MODIFYUSER_PASSWORD_MATCH');
    }

    return res;
  }
}