import { IProfileController } from '.';
import { IProfileAuthAccess } from '.';
import { IProfileValidator } from '.';

export class ProfileService {
  private _controller: IProfileController;
  private _auth: IProfileAuthAccess;
  private _validator: IProfileValidator;

  constructor(config: {
    authentification: IProfileAuthAccess
  }) {
    this._auth = config.authentification;
  }

  set validator(validator: IProfileValidator) {
    this._validator = validator;
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