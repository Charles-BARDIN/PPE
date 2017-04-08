const fse = require('fs-extra');
const path = require('path');

fse.copySync(path.resolve(__dirname, '../booking-client/booking-client-app/dist'), path.resolve(__dirname, '../booking-server/booking-server-app/static'));

process.exit(0);