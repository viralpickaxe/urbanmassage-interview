import { Component } from "react"
import React from "react"
import classNames from "classnames"

import Store from "../../../state/Store"
import ObjectStore from "../../../state/ObjectStore"
import ListStore from "../../../state/ListStore"
import { API, APIMethods } from "../../../state/API"

import { Link } from "../general/Link"
import { CheckboxGroup } from "../inputs/CheckboxGroup"
import { Loader } from "../general/Loader"
import { Card } from "../general/Card"
import { TextInput } from "../inputs/TextInput"
import { Button } from "../general/Button"
import { Paginator } from "../general/Paginator"

interface PropsType {
    
    /**
     * Character ID to display in the card
     * 
     * @type {string}
     * @memberof PropsType
     */
    characterId: string

}

export class CharacterCard extends Component<PropsType, null> {

    toggleFav() {

        let id = this.props.characterId

        let character = ObjectStore.getObject("character", id)

        new API(APIMethods.PATCH, `/characters/${id}`, {
            is_fav: !character.get("is_fav")
        }).send()
            .then((response) => {
                
                ObjectStore.mergeObjectToStore("character", response.data)

            })

    }

    render() {

        let id = this.props.characterId

        let character = ObjectStore.getObject("character", id)

        if ( character === "loading" ) return null

        let fav_star = <span onClick={this.toggleFav.bind(this)} className={classNames("fa fa-star CharacterCard__star",{
            "CharacterCard__star--active": character.get("is_fav")
        })} />

        return <div className="CharacterCard">

            <div className="CharacterCard__data">

                <div className="CharacterCard__dataLeft">
                    <div className="CharacterCard__dataName">{character.get("name")} {fav_star}</div>
                    <div className="CharacterCard__dataInfo">{character.get("birth_year")}</div>
                </div>

                <div className="CharacterCard__dataStats">
                    
                    <div className="CharacterCard__dataStatsStat">
                        <div className="CharacterCard__dataStatsStatTitle">Height</div>
                        <div className="CharacterCard__dataStatsStatValue"><strong>{character.get("height")}</strong></div>
                    </div>

                    <div className="CharacterCard__dataStatsStat">
                        <div className="CharacterCard__dataStatsStatTitle">Mass</div>
                        <div className="CharacterCard__dataStatsStatValue"><strong>{character.get("mass")}</strong></div>
                    </div>

                    <div className="CharacterCard__dataStatsStat">
                        <div className="CharacterCard__dataStatsStatTitle">Hair</div>
                        <div className="CharacterCard__dataStatsStatValue"><strong>{character.get("hair_color")}</strong></div>
                    </div>

                    <div className="CharacterCard__dataStatsStat">
                        <div className="CharacterCard__dataStatsStatTitle">Skin</div>
                        <div className="CharacterCard__dataStatsStatValue"><strong>{character.get("skin_color")}</strong></div>
                    </div>

                    <div className="CharacterCard__dataStatsStat">
                        <div className="CharacterCard__dataStatsStatTitle">Eye</div>
                        <div className="CharacterCard__dataStatsStatValue"><strong>{character.get("eye_color")}</strong></div>
                    </div>
                    
                </div>

            </div>

        </div>

    }

}