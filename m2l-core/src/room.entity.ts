export class Room {
  public id: number;
  public name: string;
  public image: string;
  public description: string;

  constructor(room: {
    id: number,
    name: string,
    image?: string,
    description: string;
  }) {
    this.id = room.id;
    this.name = room.name;
    this.image = room.image;
    this.description = room.description;
  }
}