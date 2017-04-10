import { Booking } from 'm2l-core';
import { IBookingCancelNavAccess, IBookingCancelGateway, IBookingCancelController } from '.';

export class BookingCancelService {
    private _nav: IBookingCancelNavAccess;
    private _gateway: IBookingCancelGateway;
    private _controller: IBookingCancelController;
    private _booking: Booking;

    constructor(config: {
        navigation: IBookingCancelNavAccess,
        gateway: IBookingCancelGateway
    }) {
        this._nav = config.navigation;
        this._gateway = config.gateway;
    }

    set controller(controller: IBookingCancelController) {
        this._controller = controller;
    }

    public onPageLoad() {
        this._booking = this._nav.getRouteParameters();
    }

    public onValidate(booking: Booking) {
        this._gateway.cancelBooking(booking)
            .then(res => {
                this._nav.goTo('booking');
            })
            .catch(errors => {
                this._controller.displayBackendErrors(errors);
            });
    }

    public onCancel() {
        this._nav.goTo('booking');
    }
}