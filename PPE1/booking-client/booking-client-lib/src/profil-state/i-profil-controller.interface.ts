import { User } from 'm2l-core';

export interface IProfilController {
  hideTexts(): void;
  showValidationErrors(errors: string[]): void;
  showBackendError(err: string): void;
  setUserProfil(user: User): void;
  showModifyConfirmation(): void;
}