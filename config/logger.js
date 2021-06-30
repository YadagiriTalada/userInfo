const { configure, getLogger } = require('log4js');

configure({
    appenders: {
        out: { type: 'stdout'},
        app: { type: 'file', filename: 'loggers/app.log'},
    },
    categories: {
        default: {
            appenders: ['app', 'out'],
            level: 'debug'
        }
    }
});

const logger = getLogger();

module.exports = { logger };