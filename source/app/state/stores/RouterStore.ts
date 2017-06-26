import { fromJS } from "immutable"
import Uniloc from "uniloc"
import qs from "qs"

// Initial state of the store
const INITIAL_STATE = fromJS({
    path: "",
    hash: "",
    options: {},
    query: {},
    active_route: ""
})

export default (state, action) => {

    if ( !state ) {
        return INITIAL_STATE
    }

    if ( action.type === "ROUTER_LOCATION_UPDATE" ) { // When the URL is updated update the router

        // Lookup the url in the uniloc router object
        let view = router.lookup(action.data.pathname)

        state = state.set("path", action.data.pathname)
        state = state.set("hash", action.data.hash)
        state = state.set("active_route", view.name)
        state = state.set("query", fromJS(qs.parse(action.data.search.substr(1))))
        state = state.set("options", fromJS(view.options))

    }

    return state

}

// Define the routes
const router = Uniloc({
    index: "GET /",
    create: "GET /new"
})