import { Room } from 'm2l-core';

import { IRoomNewNavAccess, IRoomNewGateway, IRoomNewController, IRoomNewAuth } from '.';

export class RoomNewService {
    private _nav: IRoomNewNavAccess;
    private _gateway: IRoomNewGateway;
    private _controller: IRoomNewController;
    private _auth: IRoomNewAuth;

    constructor(config: {
        navigation: IRoomNewNavAccess,
        gateway: IRoomNewGateway,
        authentification: IRoomNewAuth
    }) {
        this._nav = config.navigation;
        this._gateway = config.gateway;
        this._auth = config.authentification;
    }

    set controller(controller: IRoomNewController) {
        this._controller = controller;
    }

    public onPageLoad() {
        if (!this._auth.userIsConnected()) {
            this._nav.goTo('login');
        }
    }

    public addRoom(room: { description: string, name: string, image: File }) {
        this._controller.hideMessages();
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
        this._nav.goTo('rooms');
    }
}
