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

                });
            },
            get: function get(booking: { roomID: number, date?: Date }): Promise<Booking[]> {
                return new Promise((resolve, reject) => {

                });
            },
            remove: function remove(booking: Booking): Promise<boolean> {
                return new Promise((resolve, reject) => {

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
            let result = bookingService.bookARoom({roomID: 1, userID: 1, date: new Date()});

            expect(result).to.be.an.instanceof(Promise);
        });
    });
});