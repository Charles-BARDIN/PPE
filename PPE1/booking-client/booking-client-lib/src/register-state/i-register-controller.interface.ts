export interface IRegisterController {
  showValidationErrors(err: string[]): void;
  hideErrors(): void
  showBackendError(errors: string[])
}