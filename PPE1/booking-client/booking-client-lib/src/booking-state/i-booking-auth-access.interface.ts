export interface IBookingAuthAccess {
  getUserID(): number;
  userIsConnected(): boolean;
}