var fs = require('fs');
var path = require('path');

var arg = process.argv[2];

if (['dev', 'prod', 'mock'].indexOf(arg) < 0) {
  throw new Error('Invalid argument');
}

fs.writeFileSync(path.resolve(__dirname, '../src/config.js'),
  `export default {
  apiBaseUrl: ${arg === 'dev' ? "'http://localhost:8080/api/v1.1.0'" : process.env.PORT ? "'http://localhost:" + process.env.PORT + "/api/v1.1.0'" : "'http://localhost:9900/api/v1.1.0'"},
  isMock: ${arg === 'mock'}
};`
);