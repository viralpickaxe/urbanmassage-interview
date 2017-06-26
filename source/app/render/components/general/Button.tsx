import { Component } from "react"
import React from "react"
import classNames from "classnames"

interface PropsType {

    /**
     * Stuff to display in the button
     * 
     * @type {any}
     * @memberof PropsType
     */
    children: any
    
    /**
     * An icon to show on the left of the button
     * 
     * @type {string}
     * @memberof PropsType
     */
    iconLeft?: string
    
    /**
     * An Icon to show on the right of the button
     * 
     * @type {string}
     * @memberof PropsType
     */
    iconRight?: string
    
    /**
     * Primary button style
     * 
     * @type {boolean}
     * @memberof PropsType
     */
    primary?: boolean
    
    /**
     * Green button style
     * 
     * @type {boolean}
     * @memberof PropsType
     */
    green?: boolean
    
    /**
     * Dotted border button style
     * 
     * @type {boolean}
     * @memberof PropsType
     */
    dottedBorder?: boolean
    
    /**
     * Transparent button style
     * 
     * @type {boolean}
     * @memberof PropsType
     */
    transparent?: boolean
    
    /**
     * Square button style
     * 
     * @type {boolean}
     * @memberof PropsType
     */
    square?: boolean
    
    /**
     * Block button style
     * 
     * @type {boolean}
     * @memberof PropsType
     */
    block?: boolean
    
    /**
     * Is the button disabled
     * 
     * @type {boolean}
     * @memberof PropsType
     */
    disabled?: boolean

}

/**
 * Generic Button component
 * 
 * @export
 * @class Button
 * @extends {Component<PropsType, null>}
 */
export class Button extends Component<PropsType, null> {

    render() {

        // Generate the classname
        let button_classes = classNames("Button", {
            "Button--primary": this.props.primary,
            "Button--green": this.props.green,
            "Button--dottedBorder": this.props.dottedBorder,
            "Button--transparent": this.props.transparent,
            "Button--square": this.props.square,
            "Button--block": this.props.block,
            "Button--disabled": this.props.disabled
        })

        return <button className={button_classes} disabled={this.props.disabled}>

            <span className="Button__text">
                {this.props.iconLeft ? <span className={`fa fa-${this.props.iconLeft} Button__icon-left`} /> : null}
                {this.props.children}
                {this.props.iconRight ? <span className={`fa fa-${this.props.iconRight} Button__icon-right`} /> : null}
            </span>

        </button>

    }

}