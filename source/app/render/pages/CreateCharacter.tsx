import { Component } from "react"
import React from "react"
import classNames from "classnames"
import history from "../../state/History"

import Store from "../../state/Store"
import ObjectStore from "../../state/ObjectStore"
import ListStore from "../../state/ListStore"
import { API, APIMethods } from "../../state/API"

import { Link } from "../components/general/Link"
import { CheckboxGroup } from "../components/inputs/CheckboxGroup"
import { Loader } from "../components/general/Loader"
import { Card } from "../components/general/Card"
import { TextInput } from "../components/inputs/TextInput"
import { Button } from "../components/general/Button"
import { Paginator } from "../components/general/Paginator"

interface StateType {
    
    name: string
    height: string
    mass: string
    hair_color: any
    skin_color: any
    eye_color: any
    birth_date: string
    is_male: any

    error_message: string
    is_submitting: boolean

}

export class CreateCharacterPage extends Component<null, StateType> {

    constructor(props) {
		super(props)

		this.state = {
			name: "",
            height: "",
            mass: "",
            hair_color: [],
            skin_color: [],
            eye_color: [],
            birth_date: "",
            is_male: [],
            error_message: null,
            is_submitting: false
		}
	}

    isReady() {
    
        if (
            this.state.is_submitting ||
            this.state.name.length === 0 ||
            this.state.height.length === 0 ||
            this.state.mass.length === 0 ||
            this.state.hair_color.length === 0 ||
            this.state.skin_color.length === 0 ||
            this.state.eye_color.length === 0 ||
            this.state.birth_date.length === 0
        ) {
            return false
        }

        return true

    }

    submit(event) {

        event.preventDefault()

        if ( !this.isReady() ) return

		this.setState({is_submitting: true, error_message: null})

		new API(APIMethods.POST, "/characters", {
			name: this.state.name,
            height: this.state.height,
            mass: this.state.mass,
            hair_color: this.state.hair_color,
            skin_color: this.state.skin_color,
            eye_color: this.state.eye_color,
            birth_date: this.state.birth_date
		})
			.send()
			.then((response) => {
				
				ListStore.purgeStore()
                
                history.push({pathname: "/"})

			})
			.catch((e) => {
				
				this.setState({is_submitting: false, error_message: e.response.data.message})

			})

    }

    updateField(type: string, new_value: string) {

        var updated_state = {
            error_message: null
        }

        updated_state[type] = new_value

        this.setState(updated_state)

    }
    
    render() {

        return <div className="CreateCharacterPage">

            <div className="CreateCharacterPage__title">Create Character</div>

            {this.state.error_message}

            <form className="CreateCharacterPage__form" onSubmit={this.submit.bind(this)}>

                <TextInput
                    id="name"
                    placeholder="Character Name"
                    value={this.state.name}
                    onChange={this.updateField.bind(this)}
                />

                <TextInput
                    id="height"
                    placeholder="Height"
                    value={this.state.height}
                    onChange={this.updateField.bind(this)}
                    type="number"
                />

                <TextInput
                    id="mass"
                    placeholder="Mass"
                    value={this.state.mass}
                    onChange={this.updateField.bind(this)}
                    type="number"
                />

                <TextInput
                    id="birth_date"
                    placeholder="Birth Date"
                    value={this.state.birth_date}
                    onChange={this.updateField.bind(this)}
                />

                <div className="CreateCharacterPage__checkboxes">

                <CheckboxGroup
                    id="hair_colors"
                    title="Hair Color"
                    value={this.state.hair_color}
                    options={[
                        {value: "blond", text: "Blond"},
                        {value: "brown", text: "Brown"},
                        {value: "grey", text: "Grey"},
                        {value: "red", text: "Red"},
                        {value: "none", text: "None"}
                    ]}
                    maxSelections={1}
                    onChange={this.updateField.bind(this)}
                />

                <CheckboxGroup
                    id="skin_colors"
                    title="Skin Color"
                    value={this.state.skin_color}
                    options={[
                        {value: "fair", text: "Fair"},
                        {value: "gold", text: "Gold"},
                        {value: "grey", text: "Grey"},
                        {value: "light", text: "Light"},
                        {value: "white", text: "White"},
                        {value: "dark", text: "Dark"}
                    ]}
                    maxSelections={1}
                    onChange={this.updateField.bind(this)}
                />

                <CheckboxGroup
                    id="eye_colors"
                    title="Eye Color"
                    value={this.state.eye_color}
                    options={[
                        {value: "blue", text: "Blue"},
                        {value: "yellow", text: "Yellow"},
                        {value: "brown", text: "Brown"},
                        {value: "green", text: "Green"}
                    ]}
                    maxSelections={1}
                    onChange={this.updateField.bind(this)}
                />

                </div>

                <div className="CreateCharacterPage__submit">

                    <Button
                        primary={true}
                        disabled={!this.isReady()}
                        iconRight={this.state.is_submitting ? "spinner fa-spin" : null}
                    >Create</Button>

                </div>

            </form>

        </div>

    }

}