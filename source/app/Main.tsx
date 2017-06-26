import ReactDOM from "react-dom"
import React from "react"
import cache from "lscache"

import { Application } from "./render/Application"

import history from "./state/History"
import Store from "./state/Store"

// Dispatch the current url data to the router store
Store.dispatch({
    type: "ROUTER_LOCATION_UPDATE",
    data: history.location
})

// Listen to updates on the browser history (for example a user pressing the back button)
history.listen((location) => {

    // If an update is heard dispatch the new url data to the router store
    Store.dispatch({
        type: "ROUTER_LOCATION_UPDATE",
        data: history.location
    })

})

// Finally render the application in the mount
ReactDOM.render((<Application />), document.getElementById("react_mount"), () => {})