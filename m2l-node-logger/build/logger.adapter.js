"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoggerAdapter {
    constructor() { }
    debug(...args) {
        console.log.call(console, ...args);
    }
    log(...args) {
        console.log.call(console, ...args);
    }
    info(...args) {
        console.log.call(console, ...args);
    }
    warn(...args) {
        console.log.call(console, ...args);
    }
    error(...args) {
        console.log.call(console, ...args);
    }
}
exports.LoggerAdapter = LoggerAdapter;
