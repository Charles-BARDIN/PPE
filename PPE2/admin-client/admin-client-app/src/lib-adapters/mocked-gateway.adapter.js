export default class MockedGateway {
  constructor() { }

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
    return Promise.resolve();
  }

  getAllBookings() {
    return Promise.resolve([
      {
        roomID: 1,
        userID: 1,
        date: new Date(),
        userMail: 'mail@example.com',
        roomName: 'Amphithéâtre'
      },
      {
        roomID: 1,
        userID: 1,
        date: new Date(Number(new Date()) - 1000 * 3600 * 24 * 2),
        userMail: 'mail@example.com',
        roomName: 'Amphithéâtre'
      }
    ]);
  }

  deleteRoom(room) {
    return Promise.resolve();
  }

  getRoomImage(room) {
    return Promise.resolve(new File([""], "img.jpg"));
  }

  modifyRoom(room) {
    return Promise.resolve({});
  }

  addRoom(room) {
    return Promise.resolve(true);
  }

  getAllRooms() {
    return Promise.resolve([
      {
        id: 1,
        name: 'Amphithéâtre',
        image: '',
        description: 'Amphi description'
      }
    ]);
  }

}
