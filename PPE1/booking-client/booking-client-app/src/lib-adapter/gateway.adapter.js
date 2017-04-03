export default class Gateway {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  login(credentials) {
    return this._http(`POST`, `/login`, credentials);
  }

  logout() {
    return this._http(`POST`, `/logout`);
  }

  registerUser(user) {
    return this._http(`POST`, `/user`, user);
  }

  getRooms() {
    return this._http(`GET`, `/room`);
  }

  bookARoom(booking) {
    return this._http(`POST`, `/booking`);
  }

  modifyUser(user) {
    return this._http(`PUT`, `/user/${user.id}`);
  }

  _http(verb, url, argument) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      const hasArg = !!argument;

      req.onreadystatechange = function (event) {
        if (this.readyState === XMLHttpRequest.DONE) {
          if (this.status === 200) {
            let rep;
            try {
              rep = JSON.parse(this.responseText);
            } catch (err) {
              console.log('BAD_FORMAT');
              reject('ERR_GATEWAY_ANSWER_FORMAT');
              return;
            }
            if (rep.faults) {
              reject(rep.faults);
              return;
            }
            resolve();
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