import { Room } from "m2l-core";

export interface IRoomAccess {
  get(id: number): Promise<{ room: Room, faults: string[] }>;
}