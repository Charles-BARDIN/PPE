import { Room } from 'm2l-core';

export interface IRoomAuth {
  userIsConnected(): boolean;
}