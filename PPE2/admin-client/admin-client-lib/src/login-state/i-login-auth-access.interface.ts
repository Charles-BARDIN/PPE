export interface ILoginAuthAccess {
  login(credentials: { mail: string, password: string }): Promise<boolean>;
  userIsConnected(): boolean;

}