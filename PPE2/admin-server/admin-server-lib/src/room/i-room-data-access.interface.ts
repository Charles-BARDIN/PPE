import { Room } from 'm2l-core';

export interface IRoomDataAccess {
  deleteRoom(id: number): Promise<boolean>;
  modifyRoom(room: Room): Promise<Room>;
  addRoom(room: Room): Promise<Room>;
  getAllRooms(): Room[];
}