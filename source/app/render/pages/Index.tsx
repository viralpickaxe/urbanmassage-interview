import { Component } from "react"
import React from "react"
import classNames from "classnames"

import history from "../../state/History"
import Store from "../../state/Store"
import ListStore from "../../state/ListStore"
import { API, APIMethods } from "../../state/API"

import { Link } from "../components/general/Link"
import { CheckboxGroup } from "../components/inputs/CheckboxGroup"
import { Loader } from "../components/general/Loader"
import { Card } from "../components/general/Card"
import { TextInput } from "../components/inputs/TextInput"
import { Button } from "../components/general/Button"
import { Paginator } from "../components/general/Paginator"
import { CharacterCard } from "../components/cards/CharacterCard"

interface PropsType {

    /**
     * Searchterm to init the page with from query
     * 
     * @type {string}
     * @memberof PropsType
     */
    searchterm: string

    /**
     * Selective hair colors to filter by
     * 
     * @type {string}
     * @memberof PropsType
     */
    hair_colors: string

    /**
     * Selective skin colors to filter by
     * 
     * @type {string}
     * @memberof PropsType
     */
    skin_colors: string

    /**
     * Selective eye colors to filter by
     * 
     * @type {string}
     * @memberof PropsType
     */
    eye_colors: string
    
    /**
     * Page number to init the page with from query
     * 
     * @type {number}
     * @memberof PropsType
     */
    page: number

}

interface StateType {
    
    /**
     * Current searchterm value
     * 
     * @type {string}
     * @memberof StateType
     */
    searchterm: string

    /**
     * Selective hair colors to filter by
     * 
     * @type {[string]}
     * @memberof PropsType
     */
    hair_colors: [string]

    /**
     * Selective skin colors to filter by
     * 
     * @type {[string]}
     * @memberof PropsType
     */
    skin_colors: [string]

    /**
     * Selective eye colors to filter by
     * 
     * @type {[string]}
     * @memberof PropsType
     */
    eye_colors: [string]
    
    /**
     * Current page number of search
     * 
     * @type {number}
     * @memberof StateType
     */
    page: number
    
    /**
     * Total airports count from head for paginator
     * 
     * @type {number}
     * @memberof StateType
     */
    total_characters: number

}

/**
 * Page component for airport list page
 * 
 * @export
 * @class IndexPage
 * @extends {Component<PropsType, StateType>}
 */
export class IndexPage extends Component<PropsType, StateType> {

    constructor(props: PropsType) {
        super(props)

        this.state = {
            searchterm: this.props.searchterm,
            hair_colors: this.props.hair_colors.split(',') as [string],
            skin_colors: this.props.skin_colors.split(',') as [string],
            eye_colors: this.props.eye_colors.split(',') as [string],
            page: this.props.page,
            total_characters: null
        }
    }

    componentDidMount() {

        this.fetchTotal()

    }

    /**
     * Update the value of a field such as searchterm from an input
     * 
     * @param {string} type 
     * @param {string} new_value 
     * 
     * @memberof IndexPage
     */
    updateField(type: string, new_value: string) {

        var updated_state = {
            page: 0
        }

        updated_state[type] = new_value

        this.setState(updated_state, () => {
            
            if ( type !== "page" ) {
               
                // Refetch the total number of airports
                this.fetchTotal()

            }
            
            // Update the url query params
            this.updateQuery()

        })

    }

    /**
     * Update the page number
     * 
     * @param {number} page 
     * 
     * @memberof IndexPage
     */
    updatePage(page: number) {

        this.setState({page: page}, () => {

            // Update the url query params
            this.updateQuery()

        })

    }

    /**
     * Used to update the query params of the url
     * 
     * 
     * @memberof IndexPage
     */
    updateQuery() {

        var qs = []

        if ( this.state.searchterm.length > 0 ) { // If we have a searchterm
            qs.push(`searchterm=${encodeURIComponent(this.state.searchterm)}`)
        }

        if ( this.state.hair_colors.length > 0 && this.state.hair_colors.length < 5 ) { // If we have a filter
            qs.push(`hair_colors=${encodeURIComponent(this.state.hair_colors.join(','))}`)
        }

        if ( this.state.skin_colors.length > 0 && this.state.skin_colors.length < 6 ) { // If we have a filter
            qs.push(`skin_colors=${encodeURIComponent(this.state.skin_colors.join(','))}`)
        }

        if ( this.state.eye_colors.length > 0 && this.state.eye_colors.length < 4 ) { // If we have a filter
            qs.push(`eye_colors=${encodeURIComponent(this.state.eye_colors.join(','))}`)
        }
        
        if ( this.state.page > 0 ) { // If we are not on page 0
            qs.push(`page=${String(this.state.page)}`)
        }

        // Merge it into the url
        history.replace({search: qs.join("&")})

    }

    /**
     * Fetch the total number of characters with the current params to display an accurate paginator
     * 
     * 
     * @memberof IndexPage
     */
    fetchTotal() {

        this.setState({total_characters: null})

        // Make head request for characters
        new API(APIMethods.HEAD, `/characters`, null, null, {
            page: this.state.page,
            size: 5,
            searchterm: this.state.searchterm,
            hair_colors: this.state.hair_colors,
            skin_colors: this.state.skin_colors,
            eye_colors: this.state.eye_colors
        }).send()
            .then((response) => {

                // Extract the number of characters from the response
                let content_type = response.headers["content-type"].split("; ")
                this.setState({total_characters: parseInt(content_type[2])})

            })

    }

    render() {

        // Request the list of characters matching the current params
        let characters = ListStore.getList("character", {page: this.state.page, size: 5, searchterm: this.state.searchterm, hair_colors: this.state.hair_colors, skin_colors: this.state.skin_colors, eye_colors: this.state.eye_colors})
            
        var results = <div className="IndexPage__loadContainer"><Loader /></div>

        if ( typeof characters === "object" && characters.size > 0 ) {

            results = characters.map((id) => <CharacterCard key={id} characterId={id} />)

        } else if ( typeof characters === "object" && characters.size === 0 ) {

            results = <div className="IndexPage__noResults">
                <div className="IndexPage__noResultsMessage">We couldn't find any characters that matched that query</div>
            </div>

        }

        return <div className="container IndexPage">
                
            <div className="IndexPage__top">

                <div className="IndexPage__topLeft">
                    Characters
                </div>

                <div className="IndexPage__topRight">
                    <Link href="/new"><Button>Create</Button></Link>
                </div>

            </div>

            <div className="IndexPage__split">

                <div className="IndexPage__splitLeft">

                    <Card title="Filter Characters">

                        <TextInput
                            id="searchterm"
                            placeholder="Search Characters..."
                            iconInset="search"
                            value={this.state.searchterm}
                            onChange={this.updateField.bind(this)}
                            delay={1000}
                        />

                        <CheckboxGroup
                            id="hair_colors"
                            title="Hair Color"
                            value={this.state.hair_colors}
                            options={[
                                {value: "blond", text: "Blond"},
                                {value: "brown", text: "Brown"},
                                {value: "grey", text: "Grey"},
                                {value: "red", text: "Red"},
                                {value: "none", text: "None"}
                            ]}
                            maxSelections={-1}
                            onChange={this.updateField.bind(this)}
                        />

                        <CheckboxGroup
                            id="skin_colors"
                            title="Skin Color"
                            value={this.state.skin_colors}
                            options={[
                                {value: "fair", text: "Fair"},
                                {value: "gold", text: "Gold"},
                                {value: "grey", text: "Grey"},
                                {value: "light", text: "Light"},
                                {value: "white", text: "White"},
                                {value: "dark", text: "Dark"}
                            ]}
                            maxSelections={-1}
                            onChange={this.updateField.bind(this)}
                        />

                        <CheckboxGroup
                            id="eye_colors"
                            title="Eye Color"
                            value={this.state.eye_colors}
                            options={[
                                {value: "blue", text: "Blue"},
                                {value: "yellow", text: "Yellow"},
                                {value: "brown", text: "Brown"},
                                {value: "green", text: "Green"}
                            ]}
                            maxSelections={-1}
                            onChange={this.updateField.bind(this)}
                        />

                    </Card>

                </div>

                <div className="IndexPage__splitRight">

                    <Card title="Matching Characters">

                        {results}

                        {this.state.total_characters ? <Paginator
                            total={this.state.total_characters}
                            size={5}
                            page={this.state.page}
                            onPageChange={this.updatePage.bind(this)}
                        /> : null}

                    </Card>

                </div>

            </div>

        </div>

    }

}