import mongoose = require("mongoose")
import * as Bluebird from "bluebird"

mongoose.Promise = Bluebird

mongoose.connect(process.env.MONGO_CONNECTION)

export { mongoose }