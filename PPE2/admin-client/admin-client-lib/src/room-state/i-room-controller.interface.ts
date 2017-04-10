import { Room } from 'm2l-core';

export interface IRoomController {
    setRoomList(list: Room[]): void;
    showErrors(errors: string[]): void;
}