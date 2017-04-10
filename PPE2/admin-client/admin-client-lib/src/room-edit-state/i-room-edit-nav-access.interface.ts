import { Room } from 'm2l-core';

export interface IRoomEditNavAccess {
    getRouteParameters(): Room;
    goTo(state: string): void;
}