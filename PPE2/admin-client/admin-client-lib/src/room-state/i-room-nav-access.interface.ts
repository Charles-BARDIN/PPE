import { Room } from 'm2l-core';

export interface IRoomNavAccess {
    goTo(state: string, argument?: Room): void;
}