export interface IRegisterController {
  showValidationErrors(faults: { property: string, err: string[] }[] ): void;
  hideErrors(): void
  showBackendError(errors: string[])
}