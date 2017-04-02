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
    phone?: string,
  }) {
    this._controller.hideErrors();

    let validation = this._validateUser(newUser);

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

  private _validateUser(user: {
    lastname: string,
    firstname: string,
    address: string,
    town: string,
    zip: string,
    country: string,
    mail: string,
    phone?: string,
    password: string
  }): { valid: boolean, faults: { property: string, err: string[] }[] } {
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
            res.faults.push({
              property,
              err: ['Invalid format']
            })
          }
          break;
        default:
          if (!user[property]) {
            res.valid = false;
            res.faults.push({
              property,
              err: ['Required']
            })
          }
      }
    }

    return res;
  }
}