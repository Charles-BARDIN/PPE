import { Room } from 'm2l-core';

export class RoomService {
  constructor() {

  }

  public deleteRoom(roomID: number): Promise<boolean> {
    return new Promise((resolve, reject) => {

    });
  }

  public modifyRoom(room: Room): Promise<Room> {
    return new Promise((resolve, reject) => {

    });
  }

  public addRoom(room: Room): Promise<Room> {
    return new Promise((resolve, reject) => {

    });
  }

  public getRoomImage(roomID: number): Promise<string> {
    return new Promise((resolve, reject) => {

    });
  }

  public getAllRooms(): Promise<Room[]> {
    return new Promise((resolve, reject) => {

    });
  }
}