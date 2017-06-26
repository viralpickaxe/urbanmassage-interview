import axios from "axios"
import Store from "./Store"

/**
 * Enum for differnt types of API Methods
 * 
 * @export
 * @enum {number}
 */
export enum APIMethods {
	POST,
	GET,
	PATCH,
	HEAD
}

/**
 * Class helper for making API requests
 * 
 * @export
 * @class API
 */
export class API {

    /**
     * Create a new API request
     * @param {APIMethods} method Request method from enum
     * @param {string} uri URL to make request to
     * @param {any} [data] Body data to send with reqest
     * @param {any} [headers] Headers to send with request
     * @param {any} [params] Query to send with request
     * 
     * @memberof API
     */
    constructor(private method: APIMethods, private uri: string, private data?: any, private headers?: any, private params?: any) {

    }

    /**
     * Send the request
     * 
     * @returns Promise<any>
     * 
     * @memberof API
     */
    send(): Promise<any> {

        // Fetch the base API url and jwt auth token from the redux store
        let base_url = Store.getState().Environment.get("api_url")
        
        // Init headers object
        var headers = {
            ...this.headers || {}
        }

        switch (this.method) { // Switch between the different request types

            case APIMethods.POST: {

                // Send the post request
                return axios.post(base_url + this.uri,this.data,{
                    headers: headers,
                    params: this.params || null
                })

            }

            case APIMethods.GET: {

                // Send the get request
                return axios.get(base_url + this.uri,{
                    headers: headers,
                    params: this.params || null
                })

            }

            case APIMethods.HEAD: {

                // Send the head request
                return axios.head(base_url + this.uri,{
                    headers: headers,
                    params: this.params || null
                })

            }

            case APIMethods.PATCH: {

                // Send the patch request
                return axios.patch(base_url + this.uri,this.data,{
                    headers: headers,
                    params: this.params || null
                })

            }

        }

    }

}