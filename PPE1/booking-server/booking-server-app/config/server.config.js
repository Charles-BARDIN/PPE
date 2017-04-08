const path = require('path');

module.exports = {
  port: process.env.PORT || '9090',
  roomImageRoot: process.env.ROOM_IMAGE_ROOT || process.env.NODE_ENV === 'production' ? '' : path.resolve(__dirname, '../../../data/user_img'),
  frontEndDirectory: process.env.STATIC_DIR || path.resolve(__dirname, '../static')
};