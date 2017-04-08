const fse = require('fs-extra');
const path = require('path');

fse.copySync(path.resolve(__dirname, '../admin-client/admin-client-app/dist'), path.resolve(__dirname, '../admin-server/admin-server-app/static'));

process.exit(0);