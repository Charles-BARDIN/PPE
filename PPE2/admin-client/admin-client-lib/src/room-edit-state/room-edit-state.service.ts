import { Room } from 'm2l-core';

import { IRoomEditNavAccess, IRoomEditGateway, IRoomEditController } from '.';

export class RoomEditService {
    private _nav: IRoomEditNavAccess;
    private _gateway: IRoomEditGateway;
    private _controller: IRoomEditController;

    constructor(config: {
        navigation: IRoomEditNavAccess,
        gateway: IRoomEditGateway
    }) {
        this._nav = config.navigation;
        this._gateway = config.gateway
    }

    set controller(controller: IRoomEditController) {
        this._controller = controller;
    }

    public onPageLoad() {
        const room = this._nav.getRouteParameters();
        this._controller.setRoom(room);
        this._gateway.getRoomImage(room)
          .then(image => {
            this._controller.setRoomImage(image);
          })
          .catch(err => {
            console.error(err);
          })
    }

    public editRoom(room: Room) {
      this._controller.hideMessages();
        let errors = [];

        if (!room.description) {
            errors.push('ERR_EDITROOM_DESCRIPTION_REQUIRED');
        }

        if (!room.name) {
            errors.push('ERR_EDITROOM_NAME_REQUIRED');
        }

        if (errors.length) {
            this._controller.showErrors(errors);
            return;
        }

        this._gateway.modifyRoom(room)
            .then(res => {
                this._controller.showConfirmation();
            })
            .catch(errors => {
                this._controller.showErrors(errors);
            });
    }

    public cancel() {
        this._nav.goTo('rooms');
    }
}
