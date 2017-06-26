import { Component } from "react"
import React from "react"

interface PropsType {
	placeholder?: string
	options: [any]
}

export class Dropdown extends Component<PropsType, null> {

    render() {

		return <div className="Dropdown">

			<select>

				{this.props.options.map((option) => {

					return <option key={option.value} value={option.value}>{option.text || option.value }</option>

				})}

			</select>

		</div>

    }

}