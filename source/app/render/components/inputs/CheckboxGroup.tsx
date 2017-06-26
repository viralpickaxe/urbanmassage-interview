import { Component } from "react"
import React from "react"
import classNames from "classnames"

interface PropsType {
	id: string,
	title?: string
	value: any,
	options: [any],
	disabled?: boolean,
	onChange?: (id: string, new_value: any) => void,
	maxSelections: number
}

interface StateType {
	
}

export class CheckboxGroup extends Component<PropsType, StateType> {

	onChange(event) {

		let id = event.target.id
		var new_value = this.props.value

		if ( event.target.checked && new_value.indexOf(id) === -1 ) {
			if ( this.props.maxSelections <= new_value.length && this.props.maxSelections !== -1 ) {
				new_value.shift()
			}
			new_value.push(id)
		} else if ( !event.target.checked && new_value.indexOf(id) !== -1 ) {
			new_value.splice(new_value.indexOf(id), 1)
		}

		if ( this.props.onChange ) {
			if ( this.props.maxSelections === 1 ) {
				this.props.onChange(this.props.id, new_value[0])
			} else {
				this.props.onChange(this.props.id, new_value)
			}
		}

	}
	
    render() {

		let classes = classNames("CheckboxGroup", {
			"CheckboxGroup--disabled": this.props.disabled
		})
		return <div className={classes}>

			{this.props.title ? <div className="CheckboxGroup__title">{this.props.title}</div> : null}

			<ul>
				{this.props.options.map((option) => {

					return <li key={option.value}><input type={this.props.maxSelections === 1 ? "radio" : "checkbox"} onChange={this.onChange.bind(this)} id={option.value} disabled={this.props.disabled} checked={this.props.value.indexOf(option.value) !== -1} /> {option.text}</li>

				})}
			</ul>
			
		</div>

    }

}