import { Room } from "m2l-core";

interface IRoomAccess {
  get(id: number): Promise<{ room: Room, faults: string[] }>;
}

export { IRoomAccess };