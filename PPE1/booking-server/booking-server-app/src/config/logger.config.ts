let level;

if(process.env.LOG_LEVEL) {
  level = ['DEBUG', 'LOG', 'INFO'].indexOf(process.env.LOG_LEVEL.toUpperCase()) !== -1 ? process.env.LOG_LEVEL.toUpperCase() : 'LOG';
} else {
  level = 'LOG';
}

export const loggerConfig = {
  level
};