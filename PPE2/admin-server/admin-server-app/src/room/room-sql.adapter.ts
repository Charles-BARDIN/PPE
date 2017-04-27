import { Room, ILogger } from 'm2l-core';

import { IRoomDataAccess } from 'admin-server-lib';

import { Database } from '../common';

export class RoomSQLAdapter implements IRoomDataAccess {
  private _db: Database;
  private _logger: ILogger;

  constructor(config: { database: Database, logger: ILogger }) {
    this._db = config.database;
    this._logger = config.logger;
  }

  deleteRoom(id: number): Promise<boolean> {

  }

  modifyRoom(room: Room): Promise<Room> {

  }

  addRoom(room: Room): Promise<Room> {

  }

  getRooms(): Promise<Room[]> {

  }

  getRoomImage(id: number): Promise<{ ext: string, data: string }> {
    
  }

  private _escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  private _unescapeHtml(safe: string): string {
    return safe
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  }
}