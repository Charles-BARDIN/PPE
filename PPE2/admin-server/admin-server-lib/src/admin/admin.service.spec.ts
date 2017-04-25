import { expect } from 'chai';
import 'mocha';

import { AdminService } from './admin.service';
import { Admin, ILogger } from 'm2l-core';

let adminService, admin, dataAccess, logger;

describe('Admin Service', () => {
  beforeEach(() => {
    admin = {
      id: 1,
      mail: 'foo@bar.baz'
    };

    dataAccess = {
      getAdminByCredentials: credentials => Promise.resolve(new Admin(admin))
    };

    logger = {
      debug: () => null,
      log: () => null,
      info: () => null,
      warn: () => null,
      error: () => null
    };

    adminService = new AdminService({ logger, dataAccess });
  });

  describe('login', () => {
    it('Should return a Promise', () => {
      let credentials = { mail: 'foo@bar.baz', password: 'password' };
      let result = adminService.login(credentials);

      expect(result).to.be.an.instanceof(Promise);
    });

    it('Should call the getAdminByCredentials method of dataAccess', done => {
      let credentials = { mail: 'foo@bar.baz', password: 'password' };
      dataAccess.getAdminByCredentials = () => {
        done();
        return Promise.resolve(new Admin(admin));
      };

      adminService.login(credentials);
    });

    it('Should resolve the Promise with an Admin if the dataAccess returned a value', () => {
      let credentials = { mail: 'foo@bar.baz', password: 'password' };

      adminService.login(credentials)
        .then(admin => expect(admin).to.be.an.instanceof(Admin));
    });

    it('Should reject the Promise if the dataAccess did not return a value', done => {
      let credentials = { mail: 'foo@bar.baz', password: 'password' };

      dataAccess.getAdminByCredentials = () => {
        return Promise.resolve(undefined);
      };

      adminService.login(credentials)
        .catch(() => done());
    });
  });

  describe('logout', () => {
    it('Should return a Promise', () => {
      expect(adminService.logout()).to.be.an.instanceof(Promise);
    });

    it('Should resolve the Promise', done => {
      adminService.logout()
        .then(() => done());
    });
  });
});