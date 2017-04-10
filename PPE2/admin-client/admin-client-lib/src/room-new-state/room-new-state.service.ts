import { Room } from 'm2l-core';

import { IRoomNewNavAccess, IRoomNewGateway, IRoomNewController } from '.';

export class RoomNewService {
    private _nav: IRoomNewNavAccess;
    private _gateway: IRoomNewGateway;
    private _controller: IRoomNewController;

    constructor(config: {
        navigation: IRoomNewNavAccess,
        gateway: IRoomNewGateway
    }) {
        this._nav = config.navigation;
        this._gateway = config.gateway
    }

    set controller(controller: IRoomNewController) {
        this._controller = controller;
    }

    public onPageLoad() {
        const room = this._nav.getRouteParameters();
        this._controller.setRoom(room);
    }

    public addRoom(room: Room) {
        let errors = [];

        if (!room.description) {
            errors.push('ERR_NEWROOM_DESCRIPTION_REQUIRED');
        }

        if (!room.name) {
            errors.push('ERR_NEWROOM_NAME_REQUIRED');
        }

        if (errors.length) {
            this._controller.showErrors(errors);
            return;
        }

        this._gateway.addRoom(room)
            .then(res => {
                this._controller.showConfirmation();
            })
            .catch(errors => {
                this._controller.showErrors(errors);
            });
    }

    public cancel() {
        this._nav.goTo('room');
    }
}