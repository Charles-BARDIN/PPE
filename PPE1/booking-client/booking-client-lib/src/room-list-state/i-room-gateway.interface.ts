import { Room } from 'm2l-core';

export interface IRoomGateway {
  getRooms(): Promise<Room[]>
}