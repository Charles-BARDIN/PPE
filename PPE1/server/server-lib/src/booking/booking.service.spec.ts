import { expect } from 'chai';
import 'mocha';

import { BookingService } from './booking.service';
import { IBookingDataAccess } from './ibooking-data-access.interface';
import { Booking, ILogger } from 'm2l-core';

let dataAccess: IBookingDataAccess, booking: Booking, bookingService: BookingService, logger: ILogger;

describe('Booking Service', () => {
    beforeEach(() => {
        dataAccess = {
            add: function add(booking: Booking): Promise<Booking> {
                return new Promise((resolve, reject) => {
                    resolve({ roomID: 1, userID: 1, date: new Date() });
                });
            },
            get: function get(booking: { roomID: number, date?: Date }): Promise<Booking[]> {
                return new Promise((resolve, reject) => {
                    resolve([]);
                });
            },
            remove: function remove(booking: Booking): Promise<boolean> {
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
        bookingService = new BookingService({ logger, dataAccess });
    });

    describe('bookARoom', () => {
        it('Should return a Promise', () => {
            let book = { roomID: 1, userID: 1, date: new Date() };

            let result = bookingService.bookARoom(book);

            expect(result).to.be.an.instanceof(Promise);
        });

        it('Should call the get method of the dataAccess', done => {
            dataAccess.get = function get(booking: Booking): Promise<Booking[]> {
                return new Promise((resolve, reject) => {
                    done();
                });
            };
            let book = { roomID: 1, userID: 1, date: new Date() };

            let result = bookingService.bookARoom(book);
        });

        it('Should call the add method of the dataAccess', done => {
            dataAccess.add = function add(booking: Booking): Promise<Booking> {
                return new Promise((resolve, reject) => {
                    done();
                });
            };
            let book = { roomID: 1, userID: 1, date: new Date() };

            let result = bookingService.bookARoom(book);
        });

        it('Should reject the promise if the room is taken', (done) => {
            dataAccess.get = function get(booking: { roomID: number, date: Date }): Promise<Booking[]> {
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