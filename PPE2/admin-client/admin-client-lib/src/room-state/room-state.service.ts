import { Room } from 'm2l-core';

import { IRoomNavAccess, IRoomGateway, IRoomController, IRoomAuth } from '.';

export class RoomService {
    private _nav: IRoomNavAccess;
    private _gateway: IRoomGateway;
    private _controller: IRoomController;
    private _auth: IRoomAuth;

    constructor(config: {
        navigation: IRoomNavAccess,
        gateway: IRoomGateway,
        authentification: IRoomAuth
    }) {
        this._nav = config.navigation;
        this._gateway = config.gateway;
        this._auth = config.authentification
    }

    set controller(controller: IRoomController) {
        this._controller = controller;
    }

    public onPageLoad() {
        if (!this._auth.userIsConnected()) {
            this._nav.goTo('login');
        }
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