import { Room } from 'm2l-core';

export interface IRoomEditController {
    showErrors(errors: string[]): void;
    showConfirmation(): void;
    setRoom(room: Room): void;
    setRoomImage(image: any): void;
    hideMessages(): void;
}