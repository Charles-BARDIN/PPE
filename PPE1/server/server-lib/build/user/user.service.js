"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    constructor(config) {
        this._logger = config.logger;
        this._data = config.dataAccess;
    }
    addUser(user_input) {
        return new Promise((resolve, reject) => {
            this._data.checkIfUserExists(user_input.mail)
                .then((res) => {
                if (!res) {
                    this._logger.log(`Mail ${user_input.mail} already taken`);
                    reject(`Mail ${user_input.mail} already taken`);
                    // TODO: check if this can cause issue for next Promise
                    return;
                }
                return this._data.add(user_input);
            })
                .then((user_data) => {
                if (!user_data) {
                    this._logger.error("An unknown error occured");
                    reject("An unknown error occured");
                    return;
                }
                resolve(user_data);
            })
                .catch((err) => {
                this._logger.error(err);
                reject(err);
            });
        });
    }
    getUser(id) {
        return new Promise((resolve, reject) => {
            this._data.get(id)
                .then((user) => {
                if (!user) {
                    reject('User not found');
                    return;
                }
                resolve(user);
            });
        });
    }
    updateUser(user_input) {
        return new Promise((resolve, reject) => {
            this._data.update(user_input)
                .then((user_data) => {
                this._logger.log('User updated:', user_data);
                resolve(user_data);
            })
                .catch((err) => {
                this._logger.error(err);
                reject(err);
            });
        });
    }
    removeUser(id) {
        return new Promise((resolve, reject) => {
            this._data.remove(id)
                .then((success) => {
                if (!success) {
                    this._logger.error("Unknown error");
                    reject("Unknown error");
                }
                resolve(true);
            })
                .catch((err) => {
                this._logger.error(err);
                reject(err);
            });
        });
    }
}
exports.UserService = UserService;
