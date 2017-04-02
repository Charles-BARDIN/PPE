import { User } from 'm2l-core';

export interface IProfileController {
  hideErrors(): void;
  showValidationErrors(errors: string[]): void;
  showBackendError(err: string): void;
  setUserProfile(user: User): void;
  showModifyConfirmation(): void;
}