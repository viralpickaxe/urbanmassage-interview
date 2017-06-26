import { Component } from "react"
import React from "react"
import classNames from "classnames"

interface PropsType {
	id: string,
	placeholder?: string
	value: string,
	type?: string,
	icon?: string,
	iconInset?: string,
	noBorder?: boolean,
	autoFocus?: boolean,
	disabled?: boolean,
	onChange?: (id: string, new_value: string) => void,
	onKeyDown?: (event) => void,
	delay?: number,
	inputRef?: any
}

interface StateType {
	value: string
}

export class TextInput extends Component<PropsType, StateType> {

	constructor(props: PropsType) {
		super(props)

		this.state = {
			value: this.props.value
		}
	}

	componentWillReceiveProps(new_props) {

		if ( new_props.value != this.state.value ) {
			this.setState({
				value: new_props.value
			})
		}

	}

	delayTimeout = null

	onChange(event) {

		this.setState({value: event.target.value})

		if ( this.props.onChange && !this.props.delay ) {
			this.props.onChange(this.props.id, event.target.value)
		} else if ( this.props.onChange && this.props.delay ) {

			if (this.delayTimeout) clearTimeout(this.delayTimeout)
			
			this.delayTimeout = setTimeout(() => {
				this.props.onChange(this.props.id, this.state.value)
			}, this.props.delay)

		}

	}

	onBlur() {

		if ( !this.props.onChange || !this.props.delay || this.props.value == this.state.value ) return

		if (this.delayTimeout) clearTimeout(this.delayTimeout)
		this.props.onChange(this.props.id, this.state.value)

	}

	onKeyDown(event) {

		if ( !this.props.onChange || !this.props.delay || this.props.value == this.state.value ) {
			if ( this.props.onKeyDown ) this.props.onKeyDown(event)
			return
		}

		if ( event.keyCode === 13 ) {

			if (this.delayTimeout) clearTimeout(this.delayTimeout)
			this.props.onChange(this.props.id, this.state.value)

		}

		if ( this.props.onKeyDown ) this.props.onKeyDown(event)

	}
	
    render() {

		let classes = classNames("TextInput", {
			"TextInput--withIcon": this.props.icon != null,
			"TextInput--withIconInset": this.props.iconInset != null,
			"TextInput--disabled": this.props.disabled,
			"TextInput--noBorder": this.props.noBorder
		})

		return <div className={classes}>

			{this.props.icon != null ? <div className="TextInput__icon"><span className={`fa fa-${this.props.icon}`} /></div> : null}
			<input
				autoFocus={this.props.autoFocus || false}
				type={this.props.type ? this.props.type : "text"}
				placeholder={this.props.placeholder}
				value={this.state.value}
				onChange={this.onChange.bind(this)}
				onBlur={this.onBlur.bind(this)}
				onKeyDown={this.onKeyDown.bind(this)}
				disabled={this.props.disabled}
				ref={this.props.inputRef || null}
			/>
			{this.props.iconInset != null ? <div className="TextInput__icon"><span className={`fa fa-${this.props.iconInset}`} /></div> : null}
			
		</div>

    }

}