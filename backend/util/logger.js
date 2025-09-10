const {createLogger, transports, format} = require("winston");
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
    format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    prettyPrint()
    ),
    transports: [
        new (transports.Console)(),
        new (transports.File)({filename: 'somefile.log'})
    ]
});

module.exports = {
    logger
};