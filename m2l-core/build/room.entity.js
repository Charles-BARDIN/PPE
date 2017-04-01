"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    constructor(room) {
        this.name = room.name;
        this.id = room.id;
        this.image = room.image;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get image() {
        return this._image;
    }
    set image(image) {
        this._image = image;
    }
}
exports.Room = Room;
