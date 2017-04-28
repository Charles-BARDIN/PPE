const fse = require('fs-extra');
const path = require('path');

fse.copySync(path.resolve(__dirname, '../data'), path.resolve(__dirname, '../PPE1/data'));
fse.copySync(path.resolve(__dirname, '../data'), path.resolve(__dirname, '../PPE2/data'));

process.exit(0);