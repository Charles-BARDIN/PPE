export interface IRouter {
  go(state: string, data?: any): void;
  getRouteParameters(): any;
}
