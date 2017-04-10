import { Room } from 'm2l-core';

export interface IRoomDeleteGateway {
    deleteRoom(room: Room): Promise<boolean>;
}