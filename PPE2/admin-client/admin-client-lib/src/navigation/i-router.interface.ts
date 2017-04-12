export interface IRouter {
  go(state: string): void;
  getRouteParameters(): any;
}