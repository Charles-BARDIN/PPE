export interface ILogoutAuthAccess {
  logout(): Promise<boolean>;
  userIsConnected(): boolean;
}