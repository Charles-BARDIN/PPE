import { Room } from 'm2l-core';

export interface IBookingController {
  setRoomList(list: Room[]): void;
  displayRoomListError(errors: string): void;
  showValidationErrors(errors: string[]): void;
  showConfirmation(): void;
  showBackendError(err: string): void;
}