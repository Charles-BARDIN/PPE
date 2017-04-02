import { User, Room, Booking } from 'm2l-core';

import { IAuthGateway } from '../session';
import { IBookingGateway } from '../booking-state';
import { IRoomGateway } from '../room-list-state';

export class ServerGateway implements IAuthGateway, IBookingGateway, IRoomGateway {
  constructor() {

  }

  public login(credentials: { mail: string, password: string }): Promise<User> {
    return new Promise((resolve, reject) => {

    });
  }

  public logout(): Promise<boolean> {
    return new Promise((resolve, reject) => {

    });
  }

  public registerUser(user: {
    lastname: string,
    firstname: string,
    address: string,
    town: string,
    zip: string,
    country: string,
    mail: string,
    password: string,
    phone?: string
  }): Promise<User> {
    return new Promise((resolve, reject) => {

    });
  }

  public getRooms(): Promise<Room[]> {
    return new Promise((resolve, reject) => {

    });
  }

  public bookARoom(booking: { roomID: number, date: Date, userID: number }): Promise<Booking> {
    return new Promise((resolve, reject) => {

    });
  }

  public modifyUser(user: {
    id: number,
    address?: string,
    town?: string,
    zip?: string,
    country?: string,
    mail?: string,
    password?: string,
    confirm?: string,
    phone?: string
  }): Promise<User> {
    return new Promise((resolve, reject) => {

    });
  }
}