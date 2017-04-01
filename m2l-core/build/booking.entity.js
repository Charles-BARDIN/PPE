"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Booking {
    constructor(booking) {
        this.roomID = booking.roomID;
        this.userID = booking.userID;
        this.date = booking.date;
    }
    get roomID() {
        return this._roomID;
    }
    set roomID(room) {
        this._roomID = room;
    }
    get userID() {
        return this._userID;
    }
    set userID(userID) {
        this._userID = userID;
    }
    get date() {
        return this._date;
    }
    set date(date) {
        this._date = date;
    }
}
exports.Booking = Booking;
