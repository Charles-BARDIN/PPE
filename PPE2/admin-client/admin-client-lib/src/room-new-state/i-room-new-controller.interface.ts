import { Room } from 'm2l-core';

export interface IRoomNewController {
    showErrors(errors: string[]): void;
    showConfirmation(): void;
    hideMessages(): void;
}