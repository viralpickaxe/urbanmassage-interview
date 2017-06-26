import { fromJS } from "immutable"
import { EventEmitter } from "events"

import { API, APIMethods } from "./API"

/**
 * A datastore that locally stores objects from the API
 * 
 * @class ObjectStore
 */
class ObjectStore {

    /**
     * Internal immutable datasotore
     * 
     * @private
     * 
     * @memberof ObjectStore
     */
    private datastore = fromJS({
        character: {}
    })
    
    /**
     * Event emitter that allows the application to subscribe to updates
     * 
     * 
     * @memberof ObjectStore
     */
    public events = new EventEmitter()

    /**
     * Get the current state of the object store
     * 
     * @returns 
     * 
     * @memberof ObjectStore
     */
    public getStore() {

        return this.datastore

    }

    /**
     * Update the internal datastore
     * 
     * @private
     * @param {any} updated_store Updated immutable store
     * 
     * @memberof ObjectStore
     */
    private updateStore(updated_store) {

        // Update the internal datastore
        this.datastore = updated_store
        
        // Emits the update to the event emitter
        setTimeout(() => {this.events.emit("data_update")}, 0)

    }
    
    /**
     * Get an object from the datastore
     * This will either retrieve the object from the API
     * or if cached it will return the cached object from the local datastore
     * 
     * @param {string} type Type of object 
     * @param {string} id ID of object
     * @returns 
     * 
     * @memberof ObjectStore
     */
    public getObject(type: string, id: string) {

        // Retrieve the object from the local datastore
        let current_value = this.getStore().getIn([type, id])

        if ( current_value == null ) { // if the object isn't in the datastore already

            // Request the object from the API
            this.requestObject(type, id)

            let loading_state = fromJS({
                __system_loading: true
            })

            // Set the object in the local datastore to a loading state
            this.updateStore(this.getStore().setIn([type, id], loading_state))

            // Return a loading state
            return "loading"

        } else if ( current_value.get("__system_loading") === true ) { // if the object is already being loaded

            // Do nothing and return a loading state
            return "loading"

        } else if ( current_value.get("__system_error") === true ) { // if the object had an error

            // Return the error
            return current_value.get("__system_error_type")

        } else { // Otherwise if the object is saved locally

            // Return it!
            return current_value

        }

    }

    /**
     * Request the object from the API
     * 
     * @param {string} type Type of object 
     * @param {string} id ID of object
     * @returns 
     * 
     * @memberof ObjectStore
     */
    public requestObject(type: string, id: string) {

        // Make an API request for the object
        return new API(APIMethods.GET, `/${type}s/${id}`).send()
            .then((response) => {
                
                // Merge the object into the local datastore
                this.mergeObjectToStore(type, response.data)

            })

    }

    /**
     * Once fetched, merge the object into the local datastore
     * 
     * @public
     * @param {string} type Type of object 
     * @param {*} object Object data
     * 
     * @memberof ObjectStore
     */
    public mergeObjectToStore(type: string, object: any) {

        // Convert the object to immutable
        let immutified_object = fromJS(object)

        // Merge in the new object
        this.updateStore(this.getStore().setIn([type, object.id], immutified_object))

    }

    /**
     * Merge multiple objects into the store at once
     * Usually from a ListStore request
     * 
     * @param {string} type Type
     * @param {[*]} objects Array of objects
     * 
     * @memberof ObjectStore
     */
    public mergeObjectsToStore(type: string, objects: [any]) {

        // Get the current state of the store
        var updated_store = this.getStore();

        // Go over each object
        objects.map((object) => {

            // Convert the object
            let immutified_object = fromJS(object)
            // Merge in the new object to the store
            updated_store = updated_store.setIn([type, object.id], immutified_object)

        })

        // Save the updated store
        this.updateStore(updated_store)

    }

}

// Init the store as a singleton
const objects: ObjectStore = new ObjectStore()

// Export the singleton
export default objects