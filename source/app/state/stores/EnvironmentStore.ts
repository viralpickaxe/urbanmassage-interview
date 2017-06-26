import { fromJS } from "immutable"

// Initial state of the store
const INITIAL_STATE = fromJS({
    api_url: "http://127.0.0.1:4000"
})

export default (state, action) => {

    if ( !state ) {
        return INITIAL_STATE
    }

    return state

}