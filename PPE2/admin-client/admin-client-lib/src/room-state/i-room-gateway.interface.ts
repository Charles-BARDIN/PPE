import { Room } from 'm2l-core';

export interface IRoomGateway {
    getAllRooms(): Promise<Room[]>;
}