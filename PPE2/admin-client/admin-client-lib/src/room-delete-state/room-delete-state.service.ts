import { Room } from 'm2l-core';

import { IRoomDeleteNavAccess, IRoomDeleteGateway, IRoomDeleteController } from '.';

export class RoomDeleteService {
    private _nav: IRoomDeleteNavAccess;
    private _gateway: IRoomDeleteGateway;
    private _controller: IRoomDeleteController;

    constructor(config: {
        navigation: IRoomDeleteNavAccess,
        gateway: IRoomDeleteGateway
    }) {
        this._nav = config.navigation;
        this._gateway = config.gateway;
    }

    public set controller(controller: IRoomDeleteController) {
        this._controller = controller;
    }

    public onValidate(room: Room) {
        this._gateway.deleteRoom(room)
            .then(res => {
                this._nav.goTo('room');
            })
            .catch(errors => {
                this._controller.displayBackendErrors(errors);
            });
    }

    public onCancel() {
        this._nav.goTo('room');
    }
}