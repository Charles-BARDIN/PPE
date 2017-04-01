"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RoomService {
    constructor(config) {
        this._logger = config.logger;
        this._data = config.dataAccess;
    }
    getRoom(id) {
        return new Promise((resolve, reject) => {
            this._data.getRoom(id)
                .then(resolve)
                .catch(err => {
                this._logger.error(err);
                reject(err);
            });
        });
    }
}
exports.RoomService = RoomService;
