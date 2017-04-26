import { expect } from 'chai';
import 'mocha';


import { RoomService } from './room.service';
import { Room, ILogger } from 'm2l-core';

let roomService, dataAccess, room, image, logger;

describe('Room Service', () => {
  beforeEach(() => {
    logger = {
      debug: () => null,
      log: () => null,
      info: () => null,
      warn: () => null,
      error: () => null
    };

    dataAccess = {
      deleteRoom: (id: number) => {
        return Promise.resolve(true);
      },
      modifyRoom: (room: Room) => {
        return Promise.resolve(room);
      },
      addRoom: (room: Room) => {
        room.id = 1;
        return Promise.resolve(room);
      },
      getRooms: () => {
        return Promise.resolve([
          new Room({ id: 1, name: 'Mocked room 1', description: 'Mocked room 1 description' }),
          new Room({ id: 2, name: 'Mocked room 2', description: 'Mocked room 2 description' })
        ]);
      },
      getRoomImage: (id) => {
        return Promise.resolve(image)
      }
    };

    image = {
      ext: 'gif',
      data: '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'
    };

    roomService = new RoomService({ dataAccess, logger });

    room = {
      id: 1,
      name: 'Mocked',
      description: 'Mocked description'
    }
  });

  describe('deleteRoom', () => {
    it('Should return a Promise', () => {
      expect(roomService.deleteRoom(1)).to.be.an.instanceof(Promise);
    });

    it('Should call the deleteRoom method of the data access', done => {
      dataAccess.deleteRoom = () => Promise.resolve(done());

      roomService.deleteRoom(1);
    });

    it('Should reject the Promise if the data access rejected the Promise', done => {
      dataAccess.deleteRoom = () => Promise.reject('ERROR');

      roomService.deleteRoom(1)
        .catch(() => done());
    });

    it('Should resolve with true if the data access resolved the Promise', done => {
      roomService.deleteRoom(1)
        .then(() => done());
    });
  });

  describe('modifyRoom', () => {
    it('Should return a Promise', () => {
      expect(roomService.modifyRoom(room)).to.be.an.instanceof(Promise);
    });

    it('Should call the modifyRoom method of the data access', done => {
      dataAccess.modifyRoom = () => Promise.resolve(done());

      roomService.modifyRoom(room);
    });

    it('Should reject the Promise if the data access rejected the Promise', done => {
      dataAccess.modifyRoom = () => Promise.reject('ERROR');

      roomService.modifyRoom(room)
        .catch(() => done());
    });

    it('Should resolve with the updated Room if the data access resolved the Promise', done => {
      dataAccess.modifyRoom = () => Promise.resolve(room);

      roomService.modifyRoom(room)
        .then(() => done());
    });

    it('Should only accept jpg, pdf, png or gif files as image', done => {
      let tests = [
        {
          ext: 'jpeg',
          done: false,
        },
        {
          ext: 'pdf',
          done: false,
        },
        {
          ext: 'png',
          done: false,
        },
        {
          ext: 'gif',
          done: false,
        },
        {
          ext: 'txt',
          done: false,
        },
        {
          ext: '',
          done: false,
        },
      ];
      let positiveCaseExtensions = ['jpeg', 'pdf', 'png', 'gif'];

      tests.forEach(test => {
        let _room = Object.assign({}, room);
        _room.image = { ext: test.ext, data: image.data };

        if (positiveCaseExtensions.indexOf(test.ext) < 0) {
          roomService.modifyRoom(_room)
            .catch(() => {
              test.done = true;
              endTest();
            });
        } else {
          roomService.modifyRoom(_room)
            .then(() => {
              test.done = true;
              endTest();
            });
        }
      });

      function endTest() {
        const isDone = tests.reduce((prev, curr) => {
          return prev && curr.done;
        }, true);

        if (isDone) done();
      }
    });
  });

  describe('addRoom', () => {
    it('Should return a Promise', () => {
      expect(roomService.addRoom(room)).to.be.an.instanceof(Promise);
    });

    it('Should call the addRoom method of the data access', done => {
      dataAccess.addRoom = () => Promise.resolve(done());

      roomService.addRoom(room);
    });

    it('Should reject the Promise if the data access rejected the Promise', done => {
      dataAccess.addRoom = () => Promise.reject('ERR');

      roomService.addRoom(room)
        .catch(() => done());
    });

    it('Should resolve with the new Room if the data access resolved the Promise', done => {
      dataAccess.addRoom = () => Promise.resolve(room);

      roomService.addRoom(room)
        .then(() => done());
    });

    it('Should only accept jpg, pdf, png or gif files as image', done => {
      let tests = [
        {
          ext: 'jpeg',
          done: false,
        },
        {
          ext: 'pdf',
          done: false,
        },
        {
          ext: 'png',
          done: false,
        },
        {
          ext: 'gif',
          done: false,
        },
        {
          ext: 'txt',
          done: false,
        },
        {
          ext: '',
          done: false,
        },
      ];
      let positiveCaseExtensions = ['jpeg', 'pdf', 'png', 'gif'];

      tests.forEach(test => {
        let _room = Object.assign({}, room);
        _room.image = { ext: test.ext, data: image.data };

        if (positiveCaseExtensions.indexOf(test.ext) < 0) {
          roomService.addRoom(_room)
            .catch(() => {
              test.done = true;
              endTest();
            });
        } else {
          roomService.addRoom(_room)
            .then(() => {
              test.done = true;
              endTest();
            });
        }
      });

      function endTest() {
        const isDone = tests.reduce((prev, curr) => {
          return prev && curr.done;
        }, true);

        if (isDone) done();
      }
    });
  });

  describe('getRoomImage', () => {
    it('Should return a Promise', () => {
      expect(roomService.getRoomImage(1)).to.be.an.instanceof(Promise);
    });

    it('Should call the getRoomImage method of the data access', done => {
      dataAccess.getRoomImage = () => {
        done();

        return Promise.resolve(image);
      };

      roomService.getRoomImage(1);
    });

    it('Should reject the Promise if the data access rejected the Promise', done => {
      dataAccess.getRoomImage = () => Promise.reject('ERR');

      roomService.getRoomImage(1)
        .catch(() => done());
    });

    it('Should resolve with the image if the data access resolved the Promise', done => {
      dataAccess.getRoomImage = () => Promise.resolve(image);

      roomService.getRoomImage(1)
        .then(() => done());
    });
  });

  describe('getAllRooms', () => {
    it('Should return a Promise', () => {
      expect(roomService.getAllRooms()).to.be.an.instanceof(Promise);
    });

    it('Should call the getRooms method of the data access', done => {
      dataAccess.getRooms = () => Promise.resolve(done());

      roomService.getAllRooms();
    });

    it('Should reject the Promise if the data access rejected the Promise', done => {
      dataAccess.getRooms = () => Promise.reject('ERR');

      roomService.getAllRooms()
        .catch(() => done());
    });

    it('Should resolve with the array of Room if the data access resolved the Promise', done => {
      dataAccess.getRooms = () => Promise.resolve([done()]);

      roomService.getAllRooms();
    });
  });
});
