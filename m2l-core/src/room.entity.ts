export class Room {
  private _id: number;
  private _name: string;
  private _image: string;

  constructor(room: {
    id: number,
    name: string,
    image: string
  }) {
    this.name = room.name;
    this.id = room.id;
    this.image = room.image;
  }

  public get name(): string {
    return this._name;
  }
  public set name(name: string) {
    this._name = name;
  }

  public get id(): number {
    return this._id;
  }
  public set id(id: number) {
    this._id = id;
  }

  public get image(): string {
    return this._image;
  }
  public set image(image: string) {
    this._image = image;
  }
}