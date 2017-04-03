var fs = require('fs');
var path = require('path');

let isDev = process.argv[2] === 'dev';

fs.writeFileSync(path.resolve(__dirname, '../src/config.js'), 
`export default {
  apiBaseUrl: ${isDev ? "'http://localhost:9000/api/v1.0.0'" : "'http://localhost:1000/api/v1.0.0'"}
};`
);