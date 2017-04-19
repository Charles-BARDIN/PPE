import { Room } from 'm2l-core';

export interface IRoomEditGateway {
    modifyRoom(room: Room): Promise<Room>;
    getRoomImage(room: Room): Promise<File>;
}