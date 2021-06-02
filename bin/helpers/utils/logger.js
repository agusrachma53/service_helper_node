const winston = require('winston');
const config = winston.config;
const sentryLog = require('../components/sentry/sentry_log');
const st = require('stack-trace');

const myconfig = {
  levels: {
    trace: 9,
    input: 8,
    verbose: 7,
    prompt: 6,
    debug: 5,
    info: 4,
    data: 3,
    help: 2,
    warn: 1,
    error: 0,
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta'
  }
};
const logger = new (winston.Logger)({
  // thanks to https://github.com/winstonjs/winston/issues/1135
  transports: [ new winston.transports.Console({
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp: function() {
      const currentDateTime = new Date();
      const date = currentDateTime.getDate();
      const month = (currentDateTime.getMonth() + 1);
      const year = currentDateTime.getFullYear();
      const hours = currentDateTime.getHours();
      const minutes = currentDateTime.getMinutes();
      const seconds = currentDateTime.getSeconds();
      const dateString = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
      return dateString;
    },
    formatter: function(options) {
      return options.timestamp() + ' [' + config.colorize(options.level, options.level.toLowerCase()) + ']: ' + options.message;
    }
  }),
  ],
  levels: myconfig.levels,
  exitOnError: false
});

const log = (context, message, scope) => {
  const msg = `(${context}) - ${message} 
  => [${st.get()[1].getFileName()}:${ st.get()[1].getLineNumber()}]`;
  if (scope === 'error') {
    logger.error(msg);
    const msgSentry = `(${context}) - ${message}`;
    sentryLog.sendError(msgSentry);
  } else {
    logger.info(msg);
  }
};

module.exports = {
  log
};
