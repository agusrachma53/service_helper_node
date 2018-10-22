const nconf   = require('nconf');
const AppServer = require('./bin/app/server');
const configs = require('./bin/infra/configs/config');
const logger = require('./bin/helpers/utils/logger');
const mongoConnectionPooling = require('./bin/helpers/databases/mongodb/connection');
configs.initEnvironments(nconf);
const appServer = new AppServer();
const port = process.env.port || nconf.get('PORT') || 1337;

appServer.server.listen(port, () => {
  const ctx = 'app-listen';
  mongoConnectionPooling.init();
  const message = ('%s started, listening at %s', appServer.server.name, appServer.server.url);
  logger.log(ctx, message, 'initate application');
});
