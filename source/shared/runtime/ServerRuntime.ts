import { HTTPServer } from "../HTTP/HTTPServer"

/**
 * The ServerRuntime provides a common wrapper around graceful shutdown functionality.
 * 
 * It's current implementation will automatically shutdown all job queues 
 *  and suspend web traffic upon a SIGINT notification.
 * 
 * @export
 * @class ServerRuntime
 */
export class ServerRuntime {

    /**
     * Creates an instance of ServerRuntime.
     * 
     * @param {HTTPServer} [http_server] Optionally provide a HTTPServer to be shutdown
     * @param {number} [grace_period=15000] The grace period in milliseconds to be given before force kill is used
     * 
     * @memberOf ServerRuntime
     */
    constructor(private http_server?: HTTPServer, private grace_period: number= 15000) {

        // Bind to the SIGTERM event - Heroku's standard interrupt.
        // From the point it is received the process has 30 seconds to shutdown however we aim for 15 seconds.
        // It is possible for a server to receive multiple SIGTERM events so we use once instead of on to handle this.
        // https://devcenter.heroku.com/articles/dynos#shutdown
        process.once("SIGTERM", this.cleanup.bind(this))
    
    }

    cleanup(): void {

        // Shutdown the webserver if it has been set
        if ( this.http_server ) {

            // Stop accepting traffic meaning requests will be gradually drained and the server stopped.
            this.http_server.stop()

        }

        // Wait for the grace_period to expire then kill SQL and close the process
        setTimeout(() => {

            // Exit the process with a clean error code
            process.exit(0)

        }, this.grace_period)

    }

}