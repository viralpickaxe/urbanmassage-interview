import { Component } from "react"
import React from "react"
import { CSSTransitionGroup } from 'react-transition-group'

import Store from "../../../state/Store"

import { Navbar } from "./Navbar"

interface PropsType {

    /**
     * Page content to render
     * 
     * @type {any}
     * @memberof PropsType
     */
    children: any,

    /**
     * Overlay content to render
     * 
     * @type {*}
     * @memberof PropsType
     */
    overlay?: any

}

interface StateType {
    
}

/**
 * The main application frame
 * 
 * @export
 * @class MainFrame
 * @extends {Component<PropsType, null>}
 */
export class MainFrame extends Component<PropsType, null> {

    /**
     * On click detector for backdrop
     * 
     * 
     * @memberof MainFrame
     */
    backdropClick() {
        
        // Dispatch the backdrop click action
        Store.dispatch({
            type: "BACKDROP_CLICK",
            data: null
        })

    }

    render() {

        return <div className="MainFrame">

            <CSSTransitionGroup transitionName="__transition" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                {this.props.overlay ? this.props.overlay : null}
                {this.props.overlay ? <div className="MainFrame__backdrop" onClick={this.backdropClick} /> : null}
            </CSSTransitionGroup>

            <Navbar />

            <div className="MainFrame__content">
                {this.props.children}
            </div>

        </div>

    }

}