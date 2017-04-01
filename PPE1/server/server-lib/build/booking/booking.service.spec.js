"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const booking_service_1 = require("./booking.service");
let dataAccess, booking, bookingService, logger;
describe('Booking Service', () => {
    beforeEach(() => {
        dataAccess = {
            add: function add(booking) {
                return new Promise((resolve, reject) => {
                    resolve({ roomID: 1, userID: 1, date: new Date() });
                });
            },
            get: function get(booking) {
                return new Promise((resolve, reject) => {
                    resolve([]);
                });
            },
            remove: function remove(booking) {
                return new Promise((resolve, reject) => {
                    resolve(true);
                });
            }
        };
        logger = {
            debug: () => null,
            log: () => null,
            info: () => null,
            warn: () => null,
            error: () => null
        };
        bookingService = new booking_service_1.BookingService({ logger, dataAccess });
    });
    describe('bookARoom', () => {
        it('Should return a Promise', () => {
            let book = { roomID: 1, userID: 1, date: new Date() };
            let result = bookingService.bookARoom(book);
            chai_1.expect(result).to.be.an.instanceof(Promise);
        });
        it('Should call the get method of the dataAccess', done => {
            dataAccess.get = function get(booking) {
                return new Promise((resolve, reject) => {
                    done();
                });
            };
            let book = { roomID: 1, userID: 1, date: new Date() };
            let result = bookingService.bookARoom(book);
        });
        it('Should call the add method of the dataAccess', done => {
            dataAccess.add = function add(booking) {
                return new Promise((resolve, reject) => {
                    done();
                });
            };
            let book = { roomID: 1, userID: 1, date: new Date() };
            let result = bookingService.bookARoom(book);
        });
        it('Should reject the promise if the room is taken', (done) => {
            dataAccess.get = function get(booking) {
                return new Promise((resolve, reject) => {
                    resolve([
                        {
                            roomID: booking.roomID,
                            date: booking.date,
                            userID: 9
                        }
                    ]);
                });
            };
            let book = { roomID: 1, userID: 1, date: new Date() };
            let result = bookingService.bookARoom(book)
                .catch(() => {
                done();
            });
        });
        it('Should resolve the promise if the room is not taken', (done) => {
            let book = { roomID: 1, userID: 1, date: new Date() };
            let result = bookingService.bookARoom(book)
                .then(() => {
                done();
            });
        });
    });
});
