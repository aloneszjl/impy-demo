let config;

switch (
  APP_ENV // eslint-disable-line
) {
  case 'prod':
    config = require('./config.prod');
    break;
  case 'trial':
    config = require('./config.urgent');
    break;
  case 'urgent':
    config = require('./config.urgent');
    break;
  default:
    config = require('./config.dev');
    break;
}

module.exports = config;
