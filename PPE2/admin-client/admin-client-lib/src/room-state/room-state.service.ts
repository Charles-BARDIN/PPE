import { Room } from 'm2l-core';

import { IRoomNavAccess, IRoomGateway, IRoomController } from '.';

export class RoomService {
    private _nav: IRoomNavAccess;
    private _gateway: IRoomGateway;
    private _controller: IRoomController

    constructor(config: {
        navigation: IRoomNavAccess,
        gateway: IRoomGateway
    }) {
        this._nav = config.navigation;
        this._gateway = config.gateway;
    }

    set controller(controller: IRoomController) {
        this._controller = controller;
    }

    public onPageLoad() {
        this._gateway.getAllRooms()
            .then(rooms => {
                this._controller.setRoomList(rooms);
            })
            .catch(errors => {
                this._controller.showErrors(errors);
            })
    }

    public onEditClick(room: Room) {
        this._nav.goTo('edit-room', room);
    }

    public onRemoveClick(room: Room) {
        this._nav.goTo('delete-room', room);
    }

    public onNewClick() {
        this._nav.goTo('new-room');
    }
}