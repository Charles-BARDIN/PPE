export interface IRoomRessourceAccess {
  addRoomImage(image: File): Promise<boolean>;
  getRoomImage(id: number): Promise<File>;
}