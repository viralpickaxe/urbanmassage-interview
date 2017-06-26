import { Component } from "react"
import React from "react"
import classNames from "classnames"

interface PropsType {
    
    /**
     * The content of the card to render, this is just normal react stuff
     * 
     * @type {*}
     * @memberof PropsType
     */
    children?: any

    /**
     * The title of the card to render above its content
     * 
     * @type {string}
     * @memberof PropsType
     */
    title?: string

    /**
     * Enable to not padd the card
     * 
     * @type {boolean}
     * @memberof PropsType
     */
    noPadd?: boolean
}

/**
 * Generic card component for rendering on dashboard as holder of content
 * Stateless
 * 
 * @export
 * @class Card
 * @extends {Component<PropsType, null>}
 */
export class Card extends Component<PropsType, null> {

    render() {

        let classes = classNames("Card", {
            "Card--noPadd": this.props.noPadd
        })

        return <div className={classes}>
        
            {this.props.title != null ? <div className="Card__title">{this.props.title}</div> : null}

            {this.props.children}

        </div>

    }

}