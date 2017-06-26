import { Component } from "react"
import React from "react"
import formatClass from "classnames"

interface PropsType {

    /**
     * White loader style
     * 
     * @type {boolean}
     * @memberof PropsType
     */
    white?: boolean

    /**
     * Small loader style
     * 
     * @type {boolean}
     * @memberof PropsType
     */
    small?: boolean

}

/**
 * Loader component to show a loading state of application
 * 
 * @export
 * @class Loader
 * @extends {Component<PropsType, null>}
 */
export class Loader extends Component<PropsType, null> {

    render() {

        // Combine all style classes
        let classes = formatClass("Loader", {
            "Loader--white": this.props.white,
            "Loader--small": this.props.small
        })

        return <div className={classes}>
            <div className="Loader__cube Loader__cube--1" />
            <div className="Loader__cube Loader__cube--2" />
            <div className="Loader__cube Loader__cube--3" />
            <div className="Loader__cube Loader__cube--4" />
            <div className="Loader__cube Loader__cube--5" />
            <div className="Loader__cube Loader__cube--6" />
            <div className="Loader__cube Loader__cube--7" />
            <div className="Loader__cube Loader__cube--8" />
            <div className="Loader__cube Loader__cube--9" />
        </div>

    }

}