"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(user) {
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
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get firstname() {
        return this._firstname;
    }
    set firstname(firstname) {
        this._firstname = firstname;
    }
    get lastname() {
        return this._lastname;
    }
    set lastname(lastname) {
        this._lastname = lastname;
    }
    get mail() {
        return this._mail;
    }
    set mail(mail) {
        // TODO: mail regex
        this._mail = mail;
    }
    get phone() {
        return this._phone;
    }
    set phone(phone) {
        this._phone = phone;
    }
    get address() {
        return this._address;
    }
    set address(address) {
        this._address = address;
    }
    get zip() {
        return this._zip;
    }
    set zip(zip) {
        this._zip = zip;
    }
    get town() {
        return this._town;
    }
    set town(town) {
        this._town = town;
    }
    get country() {
        return this._country;
    }
    set country(country) {
        this._country = country;
    }
}
exports.User = User;
