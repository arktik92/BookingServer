const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const getSuccessLogStream = () => {
    const date = new Date().toISOString().slice(0, 10); 
    const logFileName = `${date}.log`;
    const logDirectory = path.join(__dirname, '../logs/successLogs');
    const logFilePath = path.join(logDirectory, logFileName);

    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory, { recursive: true });
    }

    return fs.createWriteStream(logFilePath, { flags: 'a' });
}

const getErrorLogStream = () => {
    const date = new Date().toISOString().slice(0, 10); 
    const logFileName = `${date}.log`;
    const logDirectory = path.join(__dirname, '../logs/errorLogs');
    const logFilePath = path.join(logDirectory, logFileName);

    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory, { recursive: true });
    }

    return fs.createWriteStream(logFilePath, { flags: 'a' });
}

const successLog = morgan('[:date[iso]] :remote-addr :method :url :status :response-time ms - :res[content-length]', {
    stream: getSuccessLogStream(),
    skip: (req, res) => res.statusCode >= 400
});

const errorLog = morgan('[:date[iso]] :remote-addr :method :url :status :response-time ms - :res[content-length]', {
    stream: getErrorLogStream(),
    skip: (req, res) => res.statusCode < 400 
});


module.exports = {
    successLog,
    errorLog
} 