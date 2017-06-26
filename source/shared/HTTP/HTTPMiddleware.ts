import * as Express from "express"

/**
 * Shared super class of all HTTP Middleware designed for use with an Express webserver.
 * 
 * @export
 * @interface HTTPMiddleware
 */
export interface HTTPMiddleware {

    /**
     * Expose Express middleware that accepts Request, Response and Next
     * 
     * @returns Function An Express middleware function
     * 
     * @memberOf HTTPMiddleware
     */
    middleware(): Express.RequestHandler

}