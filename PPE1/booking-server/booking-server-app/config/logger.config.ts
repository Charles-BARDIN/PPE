let level;

if(process.env.LOG_LEVEL) {
  level = ['DEBUG', 'LOG', 'INFO'].indexOf(process.env.LOG_LEVEL.toUpperCase()) !== -1 ? process.env.LOG_LEVEL.toUpperCase() : 'DEBUG';
} else {
  level = 'DEBUG';
}

export const loggerConfig = {
  level
};