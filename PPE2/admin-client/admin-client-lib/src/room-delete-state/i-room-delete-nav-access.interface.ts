import { Room } from 'm2l-core';

export interface IRoomDeleteNavAccess {
  goTo(state: string): void;
  getRouteParameters(): Room;
}