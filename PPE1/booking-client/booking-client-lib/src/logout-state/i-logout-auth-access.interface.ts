export interface ILogoutAuthAccess {
  logout(): Promise<boolean>;
}