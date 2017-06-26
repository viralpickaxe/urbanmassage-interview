import { Logger } from "../logging/Logger"
import * as Express from "express"
import * as Moment from "moment"
import { format as fmt } from "util"
import { HTTPMiddleware } from "./HTTPMiddleware"

// Use a standard requireJS import for this module as it does not support the ES6 protocols for import
var onHeaders = require("on-headers")

/**
 * HTTPAccessLog is an Express middleware component that provides Access Log's in an Apache style format for web requests.
 * 
 * @export
 * @class HTTPAccessLog
 */
export class HTTPAccessLog implements HTTPMiddleware {

    /**
     * Holds the logger which serves as the destination of the Access Log.
     * 
     * @private
     * @type {Logger}
     * @memberOf HTTPAccessLog
     */
    private destination_log: Logger;

    /**
     * Creates an instance of HTTPAccessLog.
     * 
     * @param {Logger} logger The Log destination to send the AccesLog to.
     * 
     * @memberOf HTTPAccessLog
     */
    constructor(logger: Logger) {

        // Store the destination logger for later use
        this.destination_log = logger

    }

    /**
     * Provides an Express middleware function that will record all HTTP Access to the destination logger
     * in the Apache AccessLog format.
     * 
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Function} next
     * 
     * @memberOf HTTPAccessLog
     */
    logRequest(req: Express.Request, res: Express.Response, next: Function): void {

        // Save the start time of the request
        let request_start_time: number = Date.now()
        
        // Wait for the request to finish
        onHeaders(res, () => {

            // Record the endtime of the request
            let request_end_time: number = Date.now()

            // Calculate the duration in milliseconds of the request
            let duration: number = request_end_time - request_start_time

            // Create a log of the request in the following format
            // REMOTE_IP DATE_TIME_REQUEST_ENDED "HTTP_VERB LOCATION PROTOCOL" RESPONSE_CODE RESPONSE_TIME
            let logEntry = fmt("%s [%s] '%s %s %s' %d %d", 
                // Get the request ip from the req object
                req.ip,
                
                // Format the datetime with Moment to the Apache format
                Moment().format("DD/MM/YYYY:HH:mm:ss ZZ"),

                // Get the HTTP Method from the req object
                req.method, 

                // Get the requested path from the req object
                req.path,

                // Get the request protocol from the req object 
                req.protocol,

                // Get the Response status from res object 
                res.statusCode,

                // Copy the request duration from the prior calculation 
                duration
            )

            this.destination_log.log(this.destination_log.levels.info, logEntry)            

        })

        // Pass the request to the next piece of middleware
        next()

    }

    /**
     * Provides an Express middleware wrapper to ensure that context remains bound correctly
     * 
     * @returns {Express.RequestHandler}
     * 
     * @memberOf HTTPAccessLog
     */
    middleware(): Express.RequestHandler {

        return (req, res, next) => {
            return this.logRequest(req, res, next)
        }

    }

}