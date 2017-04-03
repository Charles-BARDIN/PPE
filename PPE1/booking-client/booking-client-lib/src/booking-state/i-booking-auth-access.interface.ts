export interface IBookingAuthAccess {
  userID: number;
  userIsConnected(): boolean;
}