import { Component } from "react"
import React from "react"
import classNames from "classnames"
import history from "../../../state/History"

interface PropsType {

    /**
     * Where to send the user once clicked
     * 
     * @type {string}
     * @memberof PropsType
     */
    href: string

    /**
     * QS to add to path
     * 
     * @type {string}
     * @memberof PropsType
     */
    query?: string

    /**
     * Classnames to be added to the link
     * 
     * @type {string}
     * @memberof PropsType
     */
    className?: string
    
    /**
     * Extra styles to be added to the link
     * 
     * @type {*}
     * @memberof PropsType
     */
    style?: any
    
    /**
     * Content to put inside the link
     * 
     * @type {any}
     * @memberof PropsType
     */
    children?: any

    /**
     * Callback to call once navigated
     * 
     * 
     * @memberof PropsType
     */
    onNavigate?: () => void
}

export class Link extends Component<PropsType, Object> {

    navigate() {
        
        // Start constructing the updated history obj
        var updated = {
            pathname: this.props.href
        }  

        if ( this.props.query ) {
            updated['search'] = this.props.query
        }

        // If we have a link navigate
        if ( this.props.href ) {
            
            history.push(updated)

        }
        
        // If we have a callback, call it
        if ( this.props.onNavigate ) {
            
            this.props.onNavigate()
            
        }

    }

    render() {

        let classes = classNames("Link", this.props.className)

        return <a className={classes} style={this.props.style || {}} onClick={this.navigate.bind(this)}>{this.props.children}</a>

    }

}