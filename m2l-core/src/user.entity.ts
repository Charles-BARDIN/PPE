export class User {
  public id: number;
  public firstname: string;
  public lastname: string;
  public mail: string;
  public phone: string;
  public address: string;
  public zip: string;
  public town: string;
  public country: string;

  constructor(user: {
    id: number,
    firstname: string,
    lastname: string,
    mail: string,
    phone: string,
    address: string,
    zip: string,
    town: string,
    country: string
  }) {
    this.id = user.id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.mail = user.mail;
    this.phone = user.phone;
    this.address = user.address;
    this.zip = user.zip;
    this.town = user.town;
    this.country = user.country;
  }
}