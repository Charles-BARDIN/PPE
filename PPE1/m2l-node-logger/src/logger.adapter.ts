import { ILogger } from 'm2l-core';

class LoggerAdapter implements ILogger {
  constructor() { }

  public debug(...args: any[]) {
    console.log.call(console, arguments);
  }

  public log(...args: any[]) {
    console.log.call(console, arguments);
  }

  public info(...args: any[]) {
    console.log.call(console, arguments);
  }

  public warn(...args: any[]) {
    console.log.call(console, arguments);
  }

  public error(...args: any[]) {
    console.log.call(console, arguments);
  }
}

export { LoggerAdapter };