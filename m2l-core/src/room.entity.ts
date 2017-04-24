export class Room {
  public id: number;
  public name: string;
  public image: { ext: string, data: string};
  public description: string;

  constructor(room: {
    id: number,
    name: string,
    image?: { ext: string, data: string},
    description: string;
  }) {
    this.id = room.id;
    this.name = room.name;
    this.image = room.image;
    this.description = room.description;
  }
}