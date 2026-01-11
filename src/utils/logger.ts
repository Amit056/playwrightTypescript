import fs from 'fs';
import path from 'path';

class Logger {
    private logFilePath: string;

    constructor(logFileName: string = 'application.log') {
        const logDir = path.resolve(__dirname, '../../logs');
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }
        this.logFilePath = path.join(logDir, logFileName);
    }

    private writeLog(level: string, message: string): void {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level.toUpperCase()}]: ${message}\n`;
        fs.appendFileSync(this.logFilePath, logMessage, 'utf8');
        console.log(logMessage.trim());
    }

    info(message: string): void {
        this.writeLog('info', message);
    }

    warn(message: string): void {
        this.writeLog('warn', message);
    }

    error(message: string): void {
        this.writeLog('error', message);
    }

    debug(message: string): void {
        this.writeLog('debug', message);
    }
}

const logger = new Logger();
export default logger;