import { IProfilController } from '.';
import { IProfilAuthAccess } from '.';
import { IProfilValidator } from '.';
import { IProfilNavAccess } from '.';

export class ProfilService {
  private _controller: IProfilController;
  private _auth: IProfilAuthAccess;
  private _validator: IProfilValidator;
  private _nav: IProfilNavAccess;

  constructor(config: {
    authentification: IProfilAuthAccess,
    navigation: IProfilNavAccess
  }) {
    this._auth = config.authentification;
    this._nav = config.navigation;
  }

  set validator(validator: IProfilValidator) {
    this._validator = validator;
  }

  set controller(controller: IProfilController) {
    this._controller = controller;
  }

  public onPageLoad() {
    if(!this._auth.userIsConnected()) {
      this._nav.goTo('index');
    }

    this._controller.setUserProfil(this._auth.user);
  }

  public modifyUser(modifiedUser: {
    id: number,
    address?: string,
    town?: string,
    zip?: string,
    country?: string,
    mail?: string,
    oldPassword?: string,
    password?: string,
    confirm?: string,
    phone?: string
  }) {
    this._controller.hideTexts();

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
    oldPassword?: string
    password?: string,
    confirm?: string,
    phone?: string
  }): { valid: boolean, faults: string[] } {
    let res = {
      valid: true,
      faults: []
    };

    [
      'id',
      'address',
      'town',
      'zip',
      'country',
      'mail',
      'oldPassword',
      'password',
      'confirm',
      'phone',
    ].forEach(property => {
      switch (property) {
        case 'mail':
          if (user[property] && !this._validator.isMail(user[property])) {
            res.valid = false;
            res.faults.push('ERR_MODIFYUSER_MAIL_FORMAT');
          }
          break;
      }
    });

    if (user.password && !user.oldPassword) {
      res.valid = false;
      res.faults.push('ERR_MODIFYUSER_OLDPASSWORD_REQUIRED');
    }

    if (user.password && user.password !== user.confirm) {
      res.valid = false;
      res.faults.push('ERR_MODIFYUSER_PASSWORD_MATCH');
    }

    return res;
  }
}