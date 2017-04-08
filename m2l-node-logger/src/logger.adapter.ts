import { ILogger } from 'm2l-core';

class LoggerAdapter implements ILogger {
  private _level: string;

  constructor(config: { level: string }) {
    this._level = config.level.toUpperCase();
  }

  public debug(...args: any[]) {
    if(!this._shouldBeLogged('DEBUG')) return;
    let log = [];
    log.push(...args);
    log.unshift(`[${this._getDateTime()}] [DEBUG]:`)
    console.log.call(console, ...log);
  }

  public log(...args: any[]) {
    if(!this._shouldBeLogged('LOG')) return;
    let log = [];
    log.push(...args);
    log.unshift(`[${this._getDateTime()}] [LOG]:`)
    console.log.call(console, ...log);
  }

  public info(...args: any[]) {
    if(!this._shouldBeLogged('INFO')) return;
    let log = [];
    log.push(...args);
    log.unshift(`[${this._getDateTime()}] [INFO]:`)
    console.log.call(console, ...log);
  }

  public warn(...args: any[]) {
    if(!this._shouldBeLogged('WARN')) return;
    let log = [];
    log.push(...args);
    log.unshift(`[${this._getDateTime()}] [WARN]:`)
    console.log.call(console, ...log);
  }

  public error(...args: any[]) {
    if(!this._shouldBeLogged('ERROR')) return;
    let log = [];
    log.push(...args);
    log.unshift(`[${this._getDateTime()}] [ERROR]:`)
    console.log.call(console, ...log);
  }

  private _shouldBeLogged(logLevel: string): boolean {
    return this._getLevelValue(logLevel) >= this._getLevelValue(this._level);
  }

  private _getLevelValue(level: string): number {
    const levelValuesTranslator = {
      DEBUG: 0,
      LOG: 1,
      INFO: 2,
      WARN: 3,
      ERROR: 4
    };
    
    return levelValuesTranslator[level];
  }

  private _getDateTime() {
    return [(new Date()).toLocaleDateString(), (new Date()).toLocaleTimeString()].join(' ');
  }
}

export { LoggerAdapter };
