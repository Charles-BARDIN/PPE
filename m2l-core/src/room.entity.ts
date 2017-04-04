export class Room {
  public id: number;
  public name: string;
  public image: string;
  public description: string;

  constructor(room: {
    id: number,
    name: string,
    image: string,
    description: string;
  }) {
    this.name = room.name;
    this.id = room.id;
    this.image = room.image;
    this.description = room.description;
  }
}