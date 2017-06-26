import * as Bluebird from "bluebird"
import { Document, Schema, Model } from "mongoose"

import { mongoose } from "../db/Database"

export interface ICharacter extends Document {

	name: String
	height: Number
	mass: Number
	hair_color: String
	skin_color: String
	eye_color: String
	birth_year: String
    is_male: Boolean
	is_fav: Boolean

	toResponse(): Object

}

export interface ICharacterModel {
	
}

const schema = new Schema({
	name: {
		type: String
	},
	height: {
		type: Number
	},
	mass: {
		type: Number
	},
	hair_color: {
		type: String
	},
    skin_color: {
		type: String
	},
    eye_color: {
		type: String
	},
    birth_year: {
		type: String
	},
	is_male: {
		type: Boolean
	},
	is_fav: {
		type: Boolean,
		default: false
	}
})

schema.methods.toResponse = function() {

	return {
		id: this._id,
		name: this.name,
        height: this.height,
        mass: this.mass,
        hair_color: this.hair_color,
        skin_color: this.skin_color,
        eye_color: this.eye_color,
        birth_year: this.birth_year,
        is_male: this.is_male,
		is_fav: this.is_fav
	}

}

export type CharacterModel = Model<ICharacter> & ICharacterModel

export const Character: CharacterModel = <CharacterModel>mongoose.model<ICharacter>("Character", schema)