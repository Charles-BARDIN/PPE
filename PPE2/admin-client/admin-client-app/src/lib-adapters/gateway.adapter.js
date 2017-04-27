import { Admin, Booking, Room } from 'm2l-core';

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
          resolve(new Admin(res.data));
        })
        .catch(err => reject(err));
    });
  }

  logout(userID) {
    return new Promise((resolve, reject) => {
      this._http(`POST`, `/logout`)
        .then(res => {
          if (res.faults.length) {
            reject(res.faults);
            return;
          }
          resolve();
        })
        .catch(err => reject(err));
    });
  }

  cancelBooking(booking) {
    return new Promise((resolve, reject) => {
      this._http(`DELETE`, `/booking/${booking.id}`, booking)
        .then(res => {
          if (res.faults.length) {
            reject(res.faults);
            return;
          }
          resolve(new Booking(res.data));
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getAllBookings() {
    return new Promise((resolve, reject) => {
      this._http(`GET`, `/booking`)
        .then(res => {
          if (res.faults.length) {
            reject(res.faults);
            return;
          }
          resolve(res.data.map(book => new Booking(book)));
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  deleteRoom(room) {
    return new Promise((resolve, reject) => {
      this._http(`DELETE`, `/room/${room.id}`)
        .then(res => {
          if (res.faults.length) {
            reject(res.faults);
            return;
          }
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  modifyRoom(room) {
    return new Promise((resolve, reject) => {
      this._http(`PUT`, `/room/${room.id}`, room)
        .then(res => {
          if (res.faults.length) {
            reject(res.faults);
            return;
          }
          resolve(new Room(res.data));
        })
        .catch(err => {

        });
    });
  }

  addRoom(room) {
    return new Promise((resolve, reject) => {
      this._http(`POST`, `/room`, room)
        .then(res => {
          if (res.faults.length) {
            reject(res.faults);
            return;
          }
          resolve(new Room(res.data));
        })
        .catch(err => {

        });
    });
  }

  getAllRooms() {
    return new Promise((resolve, reject) => {
      this._http(`GET`, `/room`)
        .then(res => {
          if (res.faults.length) {
            reject(res.faults);
            return;
          }
          resolve(res.data.map(room => new Room(room)));
        })
        .catch(err => {

        });
    });
  }

  getRoomImage(room) {
    return new Promise((resolve, reject) => {
      this._http(`GET`, `/room/${room.id}/image`)
        .then(res => {
          if (res.faults.length) {
            reject(res.faults);
            return;
          }
          resolve(res.data);
        })
        .catch(err => {

        });
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