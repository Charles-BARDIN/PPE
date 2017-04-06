import { expect } from 'chai';
import 'mocha';

import { RoomService } from './room.service';
import { IRoomDataAccess } from './iroom-data-access.interface';
import { Room, ILogger } from 'm2l-core';

import { LoggerAdapter } from 'm2l-node-logger'

let dataAccess: IRoomDataAccess, room: Room, roomService: RoomService, logger: ILogger;

describe('Room Service', () => {
  beforeEach(() => {
    dataAccess = {
      getRooms: () => {
        return new Promise(resolve => resolve());
      },
      getRoomImage: (id: number) => {
        return new Promise(resolve => resolve());
      }
    }

    logger = {
      debug: () => null,
      log: () => null,
      info: () => null,
      warn: () => null,
      error: () => null
    };

    roomService = new RoomService({ logger, dataAccess });
  });

  describe('getRooms', () => {
    it('Should return a Promise', () => {
      let result = roomService.getRooms();

      expect(result).to.be.an.instanceof(Promise);
    });

    it('Should call the getRoom method of the dataAccess', done => {
      dataAccess.getRooms = () => {
        return new Promise(() => {
          done()
        });
      };

      roomService.getRooms();
    })
  });
});