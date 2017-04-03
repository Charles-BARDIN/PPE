export default class Gateway {
  constructor() {

  }

  login(credentials) {
    return new Promise((resolve, reject) => {
      resolve({
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        mail: credentials.mail,
        phone: '+33600000000',
        address: '11 rue des peupliers',
        zip: '75000',
        town: 'Paris',
        country: 'France'
      });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  registerUser(user) {
    return new Promise((resolve, reject) => {

    });
  }

  getRooms() {
    return new Promise((resolve, reject) => {
      resolve([
        {
          id: 1,
          label: 'Amphithéâtre',
          img: '',
          description: 'Amphi description'
        }
      ]);
    });
  }

  bookARoom(booking) {
    return new Promise((resolve, reject) => {
      resolve({
        roomID: booking.roomID,
        userID: 1,
        date: booking.date
      });
    });
  }

  modifyUser(user) {
    return new Promise((resolve, reject) => {
      let copy = Object.assign({}, user);
      copy.password = undefined;
      copy.confirm = undefined;
      copy.oldPassword = undefined;

      resolve(copy);
    });
  }
}