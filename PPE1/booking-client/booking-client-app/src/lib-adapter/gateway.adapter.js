import { User, Booking, Room } from 'm2l-core';

export default class Gateway {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
      this._http(`POST`, `/login`, credentials)
        .then(res => {
          if (res.faults.length) {
            reject(res.faults);
            return;
          }

          resolve(new User(res.data));
        })
        .catch(error => reject(error));
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this._http(`POST`, `/logout`)
        .then(res => {
          resolve();
        })
        .catch(error => reject(error));
    });
  }

  registerUser(user) {
    return new Promise((resolve, reject) => {
      this._http(`POST`, `/user`, user)
        .then(res => {
          if (res.faults.length) {
            reject(res.faults);
            return;
          }

          resolve(new User(res.data));
        })
        .catch(error => reject(error));
    });
  }

  getRooms() {
    return new Promise((resolve, reject) => {
      this._http(`GET`, `/room`)
        .then(res => {
          if (res.faults.length) {
            reject(res.faults);
            return;
          }
          
          let arrayOfRooms = res.data;
          resolve(arrayOfRooms);
        })
        .catch(error => reject(error));
    });
  }

  bookARoom(booking) {
    return new Promise((resolve, reject) => {
      this._http(`POST`, `/booking`, booking)
        .then(res => {
          if (res.faults.length) {
            reject(res.faults);
            return;
          }

          resolve(new Booking(res.data));
        })
        .catch(error => reject(error));
    });
  }

  modifyUser(user) {
    return new Promise((resolve, reject) => {
      this._http(`PUT`, `/user/${user.id}`, user)
        .then(res => {
          if (res.faults.length) {
            reject(res.faults);
            return;
          }

          resolve(new User(res.data));
        })
        .catch(error => reject(error));
    });
  }

  _http(verb, url, argument) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      const hasArg = !!argument;

      req.onreadystatechange = function (event) {
        if (this.readyState === XMLHttpRequest.DONE) {
          if ([200, 304].indexOf(this.status) !== -1) {
            let rep;
            try {
              rep = JSON.parse(this.responseText);
            } catch (err) {
              reject('ERR_GATEWAY_ANSWER_FORMAT');
              return;
            }
            resolve(rep);
          } else {
            console.error('ERR_NETWORK status', this.status, this.statusText);
            reject("ERR_NETWORK");
          }
        }
      };

      req.open(verb, `${this._baseUrl}${url}`, true);

      if (hasArg) {
        argument = JSON.stringify(argument);
        req.setRequestHeader("Content-Type", "application/json");
      }

      req.send(argument);
    });
  }
}