import { Store, createStore, combineReducers, ReducersMapObject, Reducer, Action } from "redux"

import EnvironmentStore from "./stores/EnvironmentStore"
import RouterStore from "./stores/RouterStore"

/**
 * Interface for the structure of a redux dispatch action
 * 
 * @interface UMIAction
 * @extends {Action}
 */
interface UMIAction extends Action {

    /**
     * Data relevent to the action
     * 
     * @type {*}
     * @memberof UMIAction
     */
    data: any

}

/**
 * The main redux store for application wide state
 * 
 * @class UMIStore
 */
class UMIStore {

    /**
     * Redux store ref
     * 
     * @type {Store<any>}
     * @memberof UMIStore
     */
    public redux_store: Store<any> = null

    /**
     * Combine the reducers
     * 
     * @private
     * @type {ReducersMapObject}
     * @memberof UMIStore
     */
    private reducers: ReducersMapObject = {
        Environment: EnvironmentStore,
        Router: RouterStore
    }

    /**
     * Creates an instance of UMIStore.
     * 
     * @memberof UMIStore
     */
    constructor() {
        
        // Init the redux store and connect to Redux debugger
        this.redux_store = createStore(
            combineReducers(this.reducers),
            window["__REDUX_DEVTOOLS_EXTENSION__"] && window["__REDUX_DEVTOOLS_EXTENSION__"]())

    }

    /**
     * Register redux reducer
     * 
     * @param {any} leaf_name 
     * @param {Reducer<any>} reducer 
     * 
     * @memberof UMIStore
     */
    registerReducer(leaf_name, reducer: Reducer<any>) {
        this.reducers[leaf_name] = reducer
        this.redux_store.replaceReducer(combineReducers(this.reducers))
    }

    /**
     * Get the current state of the redux store
     * 
     * @returns 
     * 
     * @memberof UMIStore
     */
    getState() {
        return this.redux_store.getState()
    }

    /**
     * Dispatch an action to the redux store
     * 
     * @param {UMIAction} action The action to dispatch
     * @returns 
     * 
     * @memberof UMIStore
     */
    dispatch(action: UMIAction) {
        return this.redux_store.dispatch(action)
    }

}

// Init the store as a singleton
const store: UMIStore = new UMIStore()

// Export the singleton
export default store