export declare class User {
    private _id;
    private _firstname;
    private _lastname;
    private _mail;
    private _phone;
    private _address;
    private _zip;
    private _town;
    private _country;
    constructor(user: {
        id: number;
        firstname: string;
        lastname: string;
        mail: string;
        phone: string;
        address: string;
        zip: string;
        town: string;
        country: string;
    });
    id: number;
    firstname: string;
    lastname: string;
    mail: string;
    phone: string;
    address: string;
    zip: string;
    town: string;
    country: string;
}
