export declare class Booking {
    private _roomID;
    private _userID;
    private _date;
    constructor(booking: {
        roomID: number;
        userID: number;
        date: Date;
    });
    roomID: number;
    userID: number;
    date: Date;
}
