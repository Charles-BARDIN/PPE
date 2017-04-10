import { Room } from 'm2l-core';

export interface IRoomNewGateway {
    addRoom(room: { description: string, name: string, image: string }): Promise<boolean>;
}