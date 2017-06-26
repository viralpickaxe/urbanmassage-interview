import * as Winston from "winston"
import { LogLevel } from "./LogLevel"

// Require the winston-papertrail module via a normal CommonJS require because it sucks
// This will mutate the winston object so that the papertrail transport is available.
require("winston-papertrail")

/**
 * The Logger is a standard Logger which replicates logs back 
 * 
 * @export
 * @class Logger
 */
export class Logger {
    /**
     * Holds the instantiated Winston object that underpins the Logger.
     * 
     * @type {Winston.LoggerInstance}
     * @memberOf Logger
     */
    winston_connection: Winston.LoggerInstance

    public levels = {
        error: new LogLevel("error"),
        warn: new LogLevel("warn"),
        info: new LogLevel("info"),
        verbose: new LogLevel("verbose"),
        debug: new LogLevel("debug"),
        silly: new LogLevel("silly")
    }

    /**
     * Creates an instance of Logger.
     * 
     * @param {boolean} enable_console Enables replication of all Logs content to the Console
     * @param {boolean} enable_papertrail Enables replication of all Logs to Papertrail
     * @param {string} [service_name] The name of the Service that will appear in Papertrail. Only required if papertrail is enabled.
     * 
     * @memberOf Logger
     */
    constructor(enable_console: boolean, enable_papertrail: boolean, service_name?: string) {

        // Instantiate a new Logger
        this.winston_connection = new Winston.Logger()

        // Check if console replication should be enabled
        if ( enable_console ) {

            // Mount the console transport to the middleware stack
            this.winston_connection.add(Winston.transports.Console)

        }

        // Check if Papertrail replication should be enabled
        if ( enable_papertrail ) {

            // Create a new Papertrail connection with the environmental variables
            // Intentionally override TypeScript so we can use the non explicit Papertrail transport.
            // Extremely ugly solution
            this.winston_connection.add((Winston.transports as any).Papertrail, {
                host: process.env.PAPERTRAIL_HOST,
                port: process.env.PAPERTRAIL_PORT,
                program: service_name
            })

        }

    }

    /**
     * Log the message provided at the stated priority on this transport.
     * 
     * @param {LogLevel} level The priority to issue the log at. 
     * @param {string} message The 
     * 
     * @memberOf Logger
     */
    log(level: LogLevel, message: string): void {

        this.winston_connection.log(level.get(), message)

    }

}

/**
 * Provides a default, quick logging instance for use. 
 * 
 * Does not map to Papertrail.
 * 
 * @export
 */
export var defaultLogger = new Logger(true, false)