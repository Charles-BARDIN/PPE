import { ILogger } from 'm2l-core';

class LoggerAdapter implements ILogger {
  constructor() { }

  public debug(...args: any[]) {
    let log = [];
    log.push(...args);
    log.unshift(`[${(new Date()).toLocaleDateString()} ${(new Date()).toLocaleTimeString()}] [DEBUG]:`)
    console.log.call(console, ...log);
  }

  public log(...args: any[]) {
    let log = [];
    log.push(...args);
    log.unshift(`[${(new Date()).toLocaleDateString()} ${(new Date()).toLocaleTimeString()}] [LOG]:`)
    console.log.call(console, ...log);
  }

  public info(...args: any[]) {
    let log = [];
    log.push(...args);
    log.unshift(`[${(new Date()).toLocaleDateString()} ${(new Date()).toLocaleTimeString()}] [INFO]:`)
    console.log.call(console, ...log);
  }

  public warn(...args: any[]) {
    let log = [];
    log.push(...args);
    log.unshift(`[${(new Date()).toLocaleDateString()} ${(new Date()).toLocaleTimeString()}] [WARN]:`)
    console.log.call(console, ...log);
  }

  public error(...args: any[]) {
    let log = [];
    log.push(...args);
    log.unshift(`[${(new Date()).toLocaleDateString()} ${(new Date()).toLocaleTimeString()}] [ERROR]:`)
    console.log.call(console, ...log);
  }
}

export { LoggerAdapter };
