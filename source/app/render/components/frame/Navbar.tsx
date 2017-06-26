import { Component } from "react"
import React from "react"
import classNames from "classnames"

import Store from "../../../state/Store"
import ObjectStore from "../../../state/ObjectStore"

import { Link } from "../general/Link"

interface PropsType {
    
}

interface StateType {
    
}

export class Navbar extends Component<PropsType, StateType> {

    constructor(props: PropsType) {
        super(props)

        this.state = {
            
        }
    }

    render() {

        return <div className="Navbar">

            <div className="Navbar__left"></div>

            <div className="Navbar__center">

                <img className="Navbar__logo" src="/resources/images/smalllogo@1x.png" srcSet="/resources/images/smalllogo@2x.png 2x" />

            </div>

            <div className="Navbar__right"></div>

        </div>

    }

}