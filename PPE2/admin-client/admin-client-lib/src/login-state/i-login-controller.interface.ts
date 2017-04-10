export interface ILoginController {
  showValidationErrors(errors: string[]): void;
  showBackendErrors(errors: string[]): void;
}