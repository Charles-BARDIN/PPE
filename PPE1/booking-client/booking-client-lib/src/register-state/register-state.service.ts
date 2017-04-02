import { User } from 'm2l-core';

import { IRegisterValidator } from './i-register-validator.interface';
import { IAuthRegisterAccess } from './i-auth-register-access.interface';
import { IRegisterController } from './i-register-controller.interface';
import { IRegisterNavigationAccess } from './i-register-navigation-access.interface';

export class RegisterService {
  private _validator: IRegisterValidator;
  private _hash: Function;
  private _auth: IAuthRegisterAccess;
  private _controller: IRegisterController;
  private _nav: IRegisterNavigationAccess;

  constructor(config: {
    validator: IRegisterValidator,
    controller: IRegisterController,
    navigationService: IRegisterNavigationAccess
  }) {
    this._validator = config.validator;
    this._controller = config.controller;
    this._nav = config.navigationService;
  }

  public register(newUser: {
    lastname: string,
    firstname: string,
    address: string,
    town: string,
    zip: string,
    country: string,
    mail: string,
    password: string,
    confirm: string,
    phone?: string,
  }) {
    this._controller.hideErrors();

    let validation = this._validateUserRegistration(newUser);

    if (!validation.valid) {
      this._controller.showValidationErrors(validation.faults);
      return;
    }

    this._auth.registerUser(newUser)
      .then(user => {
        this._nav.goTo('booking');
      })
      .catch((err: string[]) => {
        this._controller.showBackendError(err);
      });
  }

  private _validateUserRegistration(user: {
    lastname: string,
    firstname: string,
    address: string,
    town: string,
    zip: string,
    country: string,
    mail: string,
    phone?: string,
    password: string,
    confirm: string
  }): { valid: boolean, faults: string[] } {
    let res = {
      valid: true,
      faults: []
    };

    for (let property in user) {
      switch (property) {
        case 'phone':
          break;
        case 'mail':
          if (!user[property] || !this._validator.isMail(user[property])) {
            res.valid = false;
            res.faults.push('ERR_REGISTER_MAIL_FORMAT');
          }
          break;
        default:
          if (!user[property]) {
            res.valid = false;
            res.faults.push('ERR_REGISTER_' + property.toUpperCase() + '_REQUIRED');
          }
      }
    }

    if(user.password !== user.confirm) {
      res.valid = false;
      res.faults.push('ERR_REGISTER_PASSWORD_MATCH');
    }

    return res;
  }
}