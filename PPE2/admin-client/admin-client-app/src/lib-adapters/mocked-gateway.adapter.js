export default class MockedGateway {
  constructor() {
    this._bookings = [
      {
        roomID: 1,
        userID: 1,
        date: new Date(),
        userMail: 'mail@example.com',
        roomName: 'Amphithéâtre'
      },
      {
        roomID: 1,
        userID: 2,
        date: new Date(Number(new Date()) - 1000 * 3600 * 24 * 2),
        userMail: 'other@example.com',
        roomName: 'Salle conviviale'
      }
    ];

    this._rooms = [
      {
        id: 1,
        name: 'Amphithéâtre',
        image: '',
        description: 'Amphi description'
      },
      {
        id: 2,
        name: 'Salle conviviale',
        image: '',
        description: 'Salle conviviale'
      }
    ];
  }

  login(credentials) {
    return Promise.resolve({
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      mail: credentials.mail,
      phone: undefined,
      address: '12 rue des peupliers',
      zip: '75000',
      town: 'Paris',
      country: 'France'
    });
  }

  logout(userID) {
    return Promise.resolve(true);
  }

  cancelBooking(booking) {
    const index = this._findBooking(booking);

    if (index < 0) {
      return Promise.resolve(true);
    }

    this._bookings.splice(index, 1);
    return Promise.resolve(true);
  }

  getAllBookings() {
    return Promise.resolve(this._bookings);
  }

  deleteRoom(room) {
    const index = this._findRoom(room);

    if (index < 0) {
      return Promise.resolve(true);
    }

    this._rooms.splice(index, 1);

    return Promise.resolve(true);
  }

  getRoomImage(room) {
    return Promise.resolve(new File([""], "img.jpg"));
  }

  modifyRoom(room) {
    const index = this._findRoom(room);

    if (index < 0) {
      return Promise.resolve(room);
    }

    this._rooms[index].description = room.description;
    this._rooms[index].image = room.image;
    this._rooms[index].name = room.name;

    return Promise.resolve(this._rooms[index]);
  }

  addRoom(room) {
    if (this._rooms.length) {
      room.id = this._rooms[this._rooms.length - 1].id + 1;
    } else {
      room.id = 1;
    }

    this._rooms.push(room);
    return Promise.resolve(this._rooms[this._rooms.length - 1]);
  }

  getAllRooms() {
    return Promise.resolve(this._rooms);
  }

  _findBooking(booking) {
    return this._bookings
      .findIndex(book => {
        book.date.setHours(0);
        book.date.setMinutes(0);
        book.date.setSeconds(0);
        book.date.setMilliseconds(0);

        booking.date.setHours(0);
        booking.date.setMinutes(0);
        booking.date.setSeconds(0);
        booking.date.setMilliseconds(0);

        return Number(book.date) === Number(booking.date) && book.roomID === booking.roomID;
      });
  }

  _findRoom(room) {
    return this._rooms
      .findIndex(roomFromArray => {
        return Number(room.id) === Number(roomFromArray.id);
      });
  }
}
