import { expect } from 'chai';
import 'mocha';

import { BookingService } from './booking.service';
import { Booking, ILogger } from 'm2l-core';

let bookingService, dataAccess, logger, booking;

describe('Booking Service', () => {
  beforeEach(() => {
    booking = {
      roomID: 1,
      userID: 1,
      date: new Date()
    };

    logger = {
      debug: () => null,
      log: () => null,
      info: () => null,
      warn: () => null,
      error: () => null
    };

    dataAccess = {
      getBookings: () => Promise.resolve([
        {
          roomID: 2,
          userID: 1,
          date: new Date()
        },
        {
          roomID: 1,
          userID: 1,
          date: new Date()
        }
      ]),
      removeBooking: (booking) => Promise.resolve(true)
    };

    bookingService = new BookingService({ dataAccess, logger });
  });

  describe('cancelBooking', () => {
    it('Should return a Promise', () => {
      expect(bookingService.cancelBooking(1)).to.be.an.instanceof(Promise);
    });

    it('Should call the removeBooking method from the dataAccess', done => {
      dataAccess.removeBooking = () => Promise.resolve(done());

      bookingService.cancelBooking(1);
    });

    it('Should resolve the Promise if the dataAccess resolved the Promise', done => {
      dataAccess.removeBooking = () => Promise.resolve(true);

      bookingService.cancelBooking(1)
        .then(() => done());
    });

    it('Should reject the Promise if the dataAccess rejected the Promise', done => {
      dataAccess.removeBooking = () => Promise.reject('ERR');
      
      bookingService.cancelBooking(1)
        .catch(() => done());
    });
  });

  describe('getAllBookings', () => {
    it('Should return a Promise', () => {
      expect(bookingService.getAllBookings()).to.be.an.instanceof(Promise);
    });

    it('Should call the getBookings method from the dataAccess', done => {
      dataAccess.getBookings = () => Promise.resolve([done()]);

      bookingService.getAllBookings();
    });

    it('Should resolve the Promise if the dataAccess resolved the Promise', done => {
      dataAccess.getBookings = () => Promise.resolve([done()]);

      bookingService.getAllBookings()
        .then(() => done());
    });

    it('Should reject the Promise if the dataAccess rejected the Promise', done => {
      dataAccess.getBookings = () => Promise.reject('ERR');

      bookingService.getAllBookings()
        .catch(() => done());
    });
  });
});