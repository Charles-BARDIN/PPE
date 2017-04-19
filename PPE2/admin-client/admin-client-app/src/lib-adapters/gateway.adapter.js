import { User, Booking, Room } from 'm2l-core';

export default class Gateway {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  login(credentials) {
    return this._http(`POST`,`/login`,credentials)
      .then(res => {

      })
      .catch(err => {

      });
  }

  logout(userID) {
    return this._http(`POST`,`/logout`,userID)
      .then(res => {

      })
      .catch(err => {

      });
  }

  cancelBooking(booking) {
    return this._http(`DELETE`,`/booking/${booking.id}`,booking)
      .then(res => {

      })
      .catch(err => {

      });
  }

  getAllBookings() {
    return this._http(`GET`,`/booking`)
      .then(res => {

      })
      .catch(err => {

      });
  }

  deleteRoom(room) {
    return this._http(`DELETE`,`/room/${room.id}`,room)
      .then(res => {

      })
      .catch(err => {

      });
  }

  modifyRoom(room) {
    return this._http(`PUT`,`/room/${room.id}`,room)
      .then(res => {

      })
      .catch(err => {

      });
  }

  addRoom(room) {
    return this._http(`POST`,`/room/${room.id}`,room)
      .then(res => {

      })
      .catch(err => {

      });
  }

  getAllRooms() {
    return this._http(`GET`,`/room`)
      .then(res => {

      })
      .catch(err => {

      });
  }

  getRoomImage(room) {
    return this._http(`GET`,`/room/${room.id}/img`,room)
      .then(res => {

      })
      .catch(err => {

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