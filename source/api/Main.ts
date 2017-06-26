require('dotenv').config()

import { HTTPServer } from "../shared/HTTP/HTTPServer"
import { ServerRuntime } from "../shared/runtime/ServerRuntime"
import { json } from "body-parser"
import { HTTPAccessLog } from "../shared/HTTP/HTTPAccessLog"
import { defaultLogger } from "../shared/logging/Logger"

// Non Typescript imports
var cors = require("cors")

// Import controllers
import { CharacterCollectionController } from "./endpoints/CharacterCollectionController"
import { CharacterObjectController } from "./endpoints/CharacterObjectController"


// Map the Heroku PORT variable if available - otherwise default to 4000
let port = process.env.PORT || 4000

// Create a HTTP Server to use
let http_server = new HTTPServer(port)

// Enable the helmet protection as this is a public facing API
http_server.enableHelmetProtections()

// Create an Access log
let access_log = new HTTPAccessLog(defaultLogger)

// Mount the access log
http_server.getApplication().use(access_log.middleware())

// Mount the body parser
http_server.getApplication().use(json())

// Mount the cors middleware
http_server.getApplication().use(cors())

// Attach the controllers for endpoints
http_server.mount("/characters", CharacterCollectionController)
http_server.mount("/characters/:id", CharacterObjectController)

// Start the HTTP server
http_server.start()

// Create a HTTP Runtime to run this server - use default grace periods for Heroku
new ServerRuntime(http_server)