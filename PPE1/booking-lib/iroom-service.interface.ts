import { Room } from 'm2l-core';

export interface IRoomService {
  getRoom(id: number): Promise<Room>;

  // This is not in the requirements
  
  // removeRoom(room: Room): Promise<boolean>;
  // updateRoom(room: Room): Promise<Room>;
  // addRoom(room: Room): Promise<Room>;
}