export class User {
  private _id: number;
  private _firstname: string;
  private _lastname: string;
  private _mail: string;
  private _phone: string;
  private _address: string;
  private _zip: string;
  private _town: string;
  private _country: string;

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

  public get id(): number {
    return this._id;
  }
  public set id(id: number) {
    this._id = id;
  }

  public get firstname(): string {
    return this._firstname;
  }
  public set firstname(firstname: string) {
    this._firstname = firstname;
  }

  public get lastname(): string {
    return this._lastname;
  }
  public set lastname(lastname: string) {
    this._lastname = lastname;
  }

  public get mail(): string {
    return this._mail;
  }
  public set mail(mail: string) {
    // TODO: mail regex
    this._mail = mail;
  }

  public get phone(): string {
    return this._phone;
  }
  public set phone(phone: string) {
    this._phone = phone;
  }

  public get address(): string {
    return this._address;
  }
  public set address(address: string) {
    this._address = address;
  }

  public get zip(): string {
    return this._zip
  }
  public set zip(zip: string) {
    this._zip = zip;
  }

  public get town(): string {
    return this._town;
  }
  public set town(town: string) {
    this._town = town;
  }

  public get country(): string {
    return this._country;
  }
  public set country(country: string) {
    this._country = country;
  }
}