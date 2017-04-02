export interface ILoginController {
  showValidationErrors(errors: string[]): void;
  showBackendError(err: string): void;
}