"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const m2l_core_1 = require("m2l-core");
class BookingService {
    constructor(config) {
        this._logger = config.logger;
        this._data = config.dataAccess;
    }
    bookARoom(booking) {
        // TODO: check user and room
        return new Promise((resolve, reject) => {
            this._data.get({ roomID: booking.roomID, date: booking.date })
                .then((bookings) => {
                if (bookings.length) {
                    reject('This room is already booked for this date');
                    return;
                }
                let book = new m2l_core_1.Booking(booking);
                return this._data.add(book);
            })
                .then(resolve)
                .catch(reject);
        });
    }
    cancelBooking(booking) {
        return new Promise((resolve, reject) => {
            let book = new m2l_core_1.Booking(booking);
            this._data.remove(book)
                .then((success) => {
                if (!success) {
                    this._logger.error("Unknown error");
                    reject('Unknown error');
                    return;
                }
                resolve(success);
            })
                .catch(reject);
        });
    }
    getBookings(filter) {
        // TODO: add limit ?
        return new Promise((resolve, reject) => {
            this._data.get({ roomID: filter.roomID, date: filter.date })
                .then(resolve)
                .catch(reject);
        });
    }
}
exports.BookingService = BookingService;
