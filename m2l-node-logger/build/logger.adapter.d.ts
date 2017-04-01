import { ILogger } from 'm2l-core';
declare class LoggerAdapter implements ILogger {
    constructor();
    debug(...args: any[]): void;
    log(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
export { LoggerAdapter };
