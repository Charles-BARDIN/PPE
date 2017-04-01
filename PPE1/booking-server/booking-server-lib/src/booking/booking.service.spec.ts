import { expect } from 'chai';
import 'mocha';

import { BookingService } from './booking.service';
import { IBookingDataAccess } from './ibooking-data-access.interface';
import { Booking, ILogger } from 'm2l-core';

import { LoggerAdapter } from 'm2l-node-logger'

let dataAccess: IBookingDataAccess, booking: Booking, bookingService: BookingService, logger: ILogger;

describe('Booking Service', () => {
  beforeEach(() => {
    dataAccess = {
      add: (booking: Booking) => {
        return new Promise((resolve, reject) => {
          resolve({ roomID: 1, userID: 1, date: new Date() });
        });
      },
      get: (booking: { roomID: number, date?: Date }) => {
        return new Promise((resolve, reject) => {
          resolve([]);
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
      dataAccess.get = (booking: Booking) => {
        return new Promise(() => {
          done();
        });
      };
      let book = { roomID: 1, userID: 1, date: new Date() };

      let result = bookingService.bookARoom(book);
    });

    it('Should call the add method of the dataAccess', done => {
      dataAccess.add = (booking: Booking) => {
        return new Promise((resolve, reject) => {
          done();
        });
      };
      let book = { roomID: 1, userID: 1, date: new Date() };

      let result = bookingService.bookARoom(book);
    });

    it('Should reject the promise if the room is taken', (done) => {
      dataAccess.get = (booking: { roomID: number, date: Date }) => {
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

  describe('getBookings', () => {
    it('Should return a Promise', () => {
      let filter = { roomID: 1 };

      let result = bookingService.getBookings(filter);

      expect(result).to.be.an.instanceof(Promise);
    });

    it('Should call the get method of the dataAccess', done => {
      dataAccess.get = (booking: Booking) => {
        return new Promise((resolve, reject) => {
          done();
        });
      };
      let filter = { roomID: 1 };

      let result = bookingService.getBookings(filter);
    });
  });
});