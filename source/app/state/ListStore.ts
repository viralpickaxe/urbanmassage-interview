import { fromJS } from "immutable"
import { EventEmitter } from "events"

import { API, APIMethods } from "./API"

import ObjectStore from "./ObjectStore"

/**
 * A datastore that locally stores object lists from the API
 * 
 * @class ListStore
 */
class ListStore {

    /**
     * Internal immutable datasotore
     * 
     * @private
     * 
     * @memberof ListStore
     */
    private datastore = fromJS({
        character: {}
    })

    /**
     * Event emitter that allows the application to subscribe to updates
     * 
     * 
     * @memberof ListStore
     */
    public events = new EventEmitter()

    /**
     * Get the current state of the object store
     * 
     * @returns 
     * 
     * @memberof ListStore
     */
    public getStore() {

        return this.datastore

    }

    /**
     * Method to clear the local list datastore
     * 
     * @memberof ListStore
     */
    public purgeStore() {

        this.datastore = fromJS({})

    }

    /**
     * Update the internal datastore
     * 
     * @private
     * @param {any} updated_store Updated immutable store
     * 
     * @memberof ListStore
     */
    private updateStore(updated_store) {

        this.datastore = updated_store
        
        setTimeout(() => {this.events.emit("data_update")}, 0)

    }

    /**
     * Get a list from the datastore
     * This will either retrieve the list from the API
     * or if cached it will return the cached list from the local datastore
     * 
     * @param {string} type Type of list
     * @param {any} params Params of the list, such as page or searchterm
     * @returns 
     * 
     * @memberof ObjectStore
     */
    public getList(type: string, params: any) {

        // Serialize the params to form something we can use as a key
        let serialized = this.serialize(params)

        // Retrieve the list from the local datastore
        let current_value = this.getStore().getIn([type, serialized])

        if ( current_value == null ) { // if the list isn't in the datastore already

            // Request the list from the API
            this.requestList(type, params)

            let loading_state = fromJS({
                __system_loading: true
            })

            // Set the list in the local datastore to a loading state
            this.updateStore(this.getStore().setIn([type, serialized], loading_state))

            // Return the loading state
            return "loading"

        } else if ( current_value.get("__system_loading") === true ) { // if the list is already being loaded

            // Return the loading state
            return "loading"

        } else if ( current_value.get("__system_error") === true ) { // if the list had an error

            // Return the error
            return current_value.get("__system_error_type")

        } else { // Otherwise if the object is saved locally

            // Reutrn the cached list
            return current_value

        }

    }

    /**
     * Request the list from the API
     * 
     * @param {string} type The type of list
     * @param {any} params Params of the list, such as page or searchterm
     * @returns 
     * 
     * @memberof ListStore
     */
    public requestList(type: string, params: any) {

        // Serialize the params to form something we can use as a key
        let serialized = this.serialize(params)

        // Make an API request for the object
        return new API(APIMethods.GET, `/${type}s/`, null, null, params).send()
            .then((response) => {

                // Merge the object into the local datastore
                this.mergeListIntoStores(type, serialized, response.data)

            })

    }

    /**
     * Once fetched, merge the object into the local datastore
     * 
     * @private
     * @param {string} type Type of list 
     * @param {string} serialized The serialized key of the list
     * @param {[any]} objects The array of objects in nthe list
     * 
     * @memberof ListStore
     */
    private mergeListIntoStores(type: string, serialized: string, objects: [any]) {

        // Merge each object into the object store
        ObjectStore.mergeObjectsToStore(type, objects)

        // Extract an array of ids
        let ids = fromJS(objects.map((object) => object.id))

        // Save the array of IDs into the local store
        this.updateStore(this.getStore().setIn([type, serialized], ids))

    }

    /**
     * Serialize the params of a list
     * 
     * @private
     * @param {any} object params of the list
     * @returns 
     * 
     * @memberof ListStore
     */
    private serialize (object: any) {
        
        if ( Array.isArray(object) ) { // Is the object an array

            // Stringify the array
            return JSON.stringify(object.map(i => this.serialize(i)))

        } else if (typeof object === 'object' && object !== null) { // Is the object an object

            return Object.keys(object) // Get the keys
                .sort() // Sort (to not cause dupe cached lists)
                .map(n => `${n}:${this.serialize(object[n])}`) // Recursivly call self to render out 3d objects
                .join('|')

        }

        // Return if is just a string/int
        return object

    }

}

// Init the store as a singleton
const objects: ListStore = new ListStore()

// Export the singleton
export default objects