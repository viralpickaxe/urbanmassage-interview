import { Component } from "react"
import React from "react"

import Store from "../state/Store"
import ObjectStore from "../state/ObjectStore"
import ListStore from "../state/ListStore"

import { Router } from "./Router"

interface ApplicationState {

	/**
	 * Component state reference to external redux state
	 * 
	 * @type {*}
	 * @memberof ApplicationState
	 */
	state: any
	
	/**
	 * Component state reference to external object store
	 * 
	 * @type {*}
	 * @memberof ApplicationState
	 */
	objects: any
	
	/**
	 * Component state reference to external list store
	 * 
	 * @type {*}
	 * @memberof ApplicationState
	 */
	lists: any

}

/**
 * The main application component, this helps sync up external states with the main react application
 * 
 * @export
 * @class Application
 * @extends {Component<null, ApplicationState>}
 */
export class Application extends Component<null, ApplicationState> {

	/**
	 * Creates an instance of Application
	 * 
	 * @memberof Application
	 */
	constructor() {
		super()

		// Map the internal states to the external states/stores
		this.state = {
			state: Store.getState(),
			objects: ObjectStore.getStore(),
			lists: ListStore.getStore()
		}

		// On redux store update, update the internal state (to trigger re-render)
		Store.redux_store.subscribe(() => {
			this.setState({
				state: Store.getState()
			})
		})

		// On object store update, update the internal state (to trigger re-render)
		ObjectStore.events.on("data_update", () => {
			this.setState({
				objects: ObjectStore.getStore()
			})
		})

		// On list store update, update the internal state (to trigger re-render)
		ListStore.events.on("data_update", () => {
			this.setState({
				lists: ListStore.getStore()
			})
		})
	}

	/**
	 * Render the Router of the application
	 * 
	 * @returns 
	 * 
	 * @memberof Application
	 */
	render() {
		return <Router />
	}

}