import { Room } from 'm2l-core';

export interface IRoomEditGateway {
    modifyRoom(room: Room): Promise<Room>;
}