const log4js = require("log4js");

log4js.configure({
    appenders: {
        miLoggerConsole: { type: "console" },
        miLoggerError: { type: 'file', filename: 'error.log' },

    },
    categories: {
        default: { appenders: ["miLoggerConsole"], level: "trace" },
        consola: { appenders: ["miLoggerConsole"], level: "info" },
        error: { appenders: ["miLoggerError"], level: "warn" }
    }
});

const logger = log4js.getLogger();