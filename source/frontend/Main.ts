require('dotenv').load()

import { HTTPServer } from "../shared/HTTP/HTTPServer"
import { ServerRuntime } from "../shared/runtime/ServerRuntime"
import { json } from "body-parser"
import { HTTPAccessLog } from "../shared/HTTP/HTTPAccessLog"
import { defaultLogger } from "../shared/logging/Logger"
import * as path from "path"

// Non Typescript imports
var cors = require("cors")

// Map the Heroku PORT variable if available - otherwise default to 4000
let port = process.env.PORT || 3000

// Create a HTTP Server to use
let http_server = new HTTPServer(port)

// Enable the helmet protection as this is a public facing API
http_server.enableHelmetProtections()

// Enable the use of pug views
http_server.enableViews("pug", path.join(__dirname, "views"))
http_server.enableStaticFolder("/resources", path.join(__dirname, "../../", "resources"))

// Create an Access log
let access_log = new HTTPAccessLog(defaultLogger)

// Mount the access log
http_server.getApplication().use(access_log.middleware())

// Mount the body parser
http_server.getApplication().use(json())

// Mount the cors middleware
http_server.getApplication().use(cors())

// Import controllers
import { WebappController } from "./controllers/WebappController"

http_server.mount("/*", WebappController)

// Start the HTTP server
http_server.start()

// Create a HTTP Runtime to run this server - use default grace periods for Heroku
new ServerRuntime(http_server)