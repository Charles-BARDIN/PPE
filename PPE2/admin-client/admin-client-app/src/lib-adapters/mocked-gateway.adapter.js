export default class MockedGateway {
  constructor() {

  }

  login(credentials) {
    return new Promise(resolve => {
      resolve({
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        mail: credentials.mail,
        phone: undefined,
        address: '12 rue des peupliers',
        zip: '75000',
        town: 'Paris',
        country: 'France'
      })
    });
  }

  logout(userID) {
    return new Promise(resolve => {

    });
  }

  cancelBooking(booking) {
    return new Promise(resolve => {

    });
  }

  getAllBookings() {
    return new Promise(resolve => {

    });
  }

  deleteRoom(room) {
    return new Promise(resolve => {

    });
  }

  modifyRoom(room) {
    return new Promise(resolve => {

    });
  }

  addRoom(room) {
    return new Promise(resolve => {

    });
  }

  getAllRooms() {
    return new Promise(resolve => {

    });
  }

}
