import { ILogger } from 'm2l-core';

class LoggerAdapter implements ILogger {
  constructor() { }

  public debug(...args: any[]) {
    console.log.call(console, ...args);
  }

  public log(...args: any[]) {
    console.log.call(console, ...args);
  }

  public info(...args: any[]) {
    console.log.call(console, ...args);
  }

  public warn(...args: any[]) {
    console.log.call(console, ...args);
  }

  public error(...args: any[]) {
    console.log.call(console, ...args);
  }
}

export { LoggerAdapter };
