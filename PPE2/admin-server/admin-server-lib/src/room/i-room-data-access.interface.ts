import { Room } from 'm2l-core';

export interface IRoomDataAccess {
  deleteRoom(id: number): Promise<boolean>;
  modifyRoom(room: Room): Promise<Room>;
  addRoom(room: Room): Promise<Room>;
  getRooms(): Promise<Room[]>;
  getRoomImage(id: number): Promise<{ ext: string, data: string }>;
}
