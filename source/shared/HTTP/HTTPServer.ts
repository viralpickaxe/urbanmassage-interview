import { Server } from "net"
import * as Express from "express"
import * as Helmet from "helmet"
import { HTTPController } from "./HTTPController"

/**
 * Defines a HTTP Web Server on the provided port.
 * 
 * The implementation is currently backed up by Express 4.
 * 
 * @export
 * @class HTTPServer
 */
export class HTTPServer {
    /**
     * The core net.Server type that unerlies the Express webserver.
     * 
     * This is retained so that we can quickly close the connection
     * 
     * @private
     * @type {Server}
     * @memberOf HTTPServer
     */
    private underlying_server: Server

    /**
     * The Port on which the server should register. 
     * 
     * Cannot be overridden once set in the constructor.
     * 
     * @private
     * @type {number}
     * @memberOf HTTPServer
     */
    private port: number

    /**
     * Holds the Express Application which is constructed but before it is mounted to underlying_server.
     * 
     * @private
     * @type {Express.Application}
     * @memberOf HTTPServer
     */
    private express_application: Express.Application

    /**
     * Creates an instance of HTTPServer on the provided port.
     * Port will default to 3000 if none is provided.
     * 
     * @param {number} [port=3000]
     * 
     * @memberOf HTTPServer
     */
    constructor(port: number = 3000) {

        // Save the assigned port or map to 3000 as the default
        this.port = port

        // Create a new Express Application to underpin this server
        this.express_application = Express()

        // Trust proxies implicitly
        this.express_application.set("trust proxy", true)

        // Set the application performance and optimization level based on the environment. 
        // Defaults to no optimizations.
        this.express_application.set("env", process.env.NODE_ENV || "development")

        // End the function
        return;

    }

    /**
     * Returns the port that the server was provided to run on.
     * 
     * @returns {number} The port the server was provided at startup.
     * 
     * @memberOf HTTPServer
     */
    getPort(): number {
        return this.port
    }

    /**
     * Returns the Port which the server is actually running on.
     * 
     * @returns {number} The port that the active server is running on - or null if none is active
     * 
     * @memberOf HTTPServer
     */
    getActivePort(): number {

        if ( this.isStarted() ) {
            
            return this.underlying_server.address().port

        } else {

            return null

        }
    
    }

    /**
     * Opens the webserver to traffic on the specified port.
     * 
     * @memberOf HTTPServer
     */
    start(): void {

        // Check that the underlying server does not already exist - otherwise take no action
        if (!this.underlying_server) {

            // Open a new server
            this.underlying_server = this.express_application.listen(this.port)

            // End the function
            return

        }

    }

    /**
     * Closes the webserver to traffic.
     * 
     * @memberOf HTTPServer
     */
    stop(): void {

        // Check if the underlying server is active - otherwise take no action
        if (this.underlying_server) {

            // Close the connection when all HTTP sockets close.
            this.underlying_server.close()

            // Mark the underlying server as null to clear it
            this.underlying_server = null

            // End the function
            return;

        }

    }

    isStarted(): boolean {
        // Use a double negative as a cast to return a boolean of the existance of this object
        return !!this.underlying_server
    }

    /**
     * Get the underlying Express Application so that middleware and routes can be mounted.
     * 
     * @returns {Express.Application}
     * 
     * @memberOf HTTPServer
     */
    getApplication(): Express.Application {
        return this.express_application
    }

    /**
     * Enable the Helmet set of protection on this server.
     * 
     * @memberOf HTTPServer
     */
    enableHelmetProtections(): void {

        // Add helmet to the webserver
        this.express_application.use(Helmet())

        // End the function
        return

    }

    /**
     * Enable use of a view engine such as pug
     * 
     * @memberOf HTTPServer
     */
    enableViews(engine: string, views: string): void {

        this.express_application.set("views", views)
        this.express_application.set("view engine", engine)

    }

    /**
     * Enable an express static route mapped to a path
     * 
     * @memberOf HTTPServer
     */
    enableStaticFolder(url: string, path: string): void {

        this.express_application.use(url, Express.static(path))

    }

    /**
     * Mount a controller to the express application to serve traffic from the provided route 
     * 
     * @param {string} route
     * @param {{ new(router: Express.IRoute): HTTPController }} controller
     * 
     * @memberOf HTTPServer
     */
    mount(route: string, controller: { new(router: Express.IRoute): HTTPController }): void {

        // Create a sub router for the controller
        let subrouter: Express.IRoute = this.express_application.route(route)

        // Mount the controller to the sub router by instantiating it with the corresponding router
        new controller(subrouter)

    }

}