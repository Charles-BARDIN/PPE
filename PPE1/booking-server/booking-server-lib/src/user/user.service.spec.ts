import { expect } from 'chai';
import 'mocha';

import { UserService } from './user.service';
import { IUserDataAccess } from './iuser-data-access.interface';
import { User, ILogger } from 'm2l-core';

import { LoggerAdapter } from 'm2l-node-logger'

let dataAccess: IUserDataAccess, user: {
  id: number,
  lastname: string,
  firstname: string,
  address: string,
  town: string,
  zip: string,
  country: string,
  mail: string,
  password: string,
  phone: string,
}, userService: UserService, logger: ILogger;

describe('User Service', () => {
  beforeEach(() => {
    dataAccess = {
      checkIfUserExists: (mail: string, id?: number) => {
        return new Promise(resolve => { resolve(false); });
      },
      add: (user: {
        lastname: string,
        firstname: string,
        address: string,
        town: string,
        zip: string,
        country: string,
        mail: string,
        password: string,
        phone?: string,
      }) => {
        return new Promise(resolve => {
          let _user: {
            lastname: string,
            firstname: string,
            address: string,
            town: string,
            zip: string,
            country: string,
            mail: string,
            password: string,
            phone: string,
            id: number
          } = {
              lastname: user.lastname,
              firstname: user.firstname,
              address: user.address,
              town: user.town,
              zip: user.zip,
              country: user.country,
              mail: user.mail,
              password: user.password,
              phone: user.phone,
              id: 1
            };
          resolve(new User(_user))
        });
      },
      getUserByCredentials: (credentials: {
        mail: string,
        password: string
      }) => {
        return new Promise(resolve => resolve(new User(user)));
      },
      update: (user: {
        id: number,
        firstname?: string,
        lastname?: string,
        mail?: string,
        phone?: string,
        address?: string,
        zip?: string,
        town?: string,
        country?: string
      }) => {
        let _user: {
          lastname: string,
          firstname: string,
          address: string,
          town: string,
          zip: string,
          country: string,
          mail: string,
          password: string,
          phone: string,
          id: number
        } = {
            lastname: user.lastname,
            firstname: user.firstname,
            address: user.address,
            town: user.town,
            zip: user.zip,
            country: user.country,
            mail: user.mail,
            password: 'password',
            phone: user.phone,
            id: 1
          };
        return new Promise(resolve => resolve(new User(_user)));
      }
    }

    logger = {
      debug: () => null,
      log: () => null,
      info: () => null,
      warn: () => null,
      error: () => null
    };

    userService = new UserService({ logger, dataAccess });

    user = {
      firstname: "foo",
      lastname: "bar",
      mail: "foo@bar.baz",
      phone: "+33000000000",
      address: "111 address",
      zip: "11111",
      town: "Paris",
      country: "France",
      id: 1,
      password: 'password'
    };
  });

  describe('addUser', () => {
    it('Should return a Promise', () => {
      user.password = 'password';
      let result = userService.addUser(user);

      expect(result).to.be.an.instanceof(Promise);
    });

    it('Should call the checkIfUserExists method of the dataAccess', done => {
      dataAccess.checkIfUserExists = () => {
        return new Promise(() => {
          done();
        });
      };

      userService.addUser(user);
    });

    it('Should call the add method of the dataAccess', done => {
      dataAccess.add = () => {
        return new Promise(() => {
          done()
        });
      };

      userService.addUser(user);
    });

    it('Should reject the promise if the user already exists', done => {
      dataAccess.checkIfUserExists = () => {
        return new Promise(resolve => {
          resolve(true);
        });
      };

      userService.addUser(user)
        .catch(() => {
          done();
        });
    });
  });

  describe('login', () => {
    it('Should return a Promise', () => {
      let credentials = { mail: 'foo@bar.baz', password: 'password' };
      let result = userService.login(credentials);

      expect(result).to.be.an.instanceof(Promise);
    });

    it('Should call the getUserByCredentials method of dataAccess', done => {
      let credentials = { mail: 'foo@bar.baz', password: 'password' };
      dataAccess.getUserByCredentials = () => {
        return new Promise(resolve => {
          done();
          resolve(new User(user));
        });
      };

      userService.login(credentials);
    });
  });

  describe('updateUser', () => {
    it('Should return a Promise', () => {
      let result = userService.updateUser(user);

      expect(result).to.be.an.instanceof(Promise);
    });

    it('Should call the update method of dataAccess', done => {
      dataAccess.update = () => {
        return new Promise(resolve => {
          done();
        });
      };

      userService.updateUser(user);
    });

    it('Should resolve the Promise with the updated user', () => {
      dataAccess.update = () => {
        return new Promise(resolve => {
          resolve(new User(user));
        });
      };

      userService.updateUser(user)
        .then((user) => {
          expect(user).to.be.an.instanceof(User);
        })
    });
  });
});