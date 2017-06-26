import * as Express from "express"
import * as Bluebird from "bluebird"
import { HTTPController } from "../../shared/HTTP/HTTPController"
import { HTTPError } from "../../shared/HTTP/HTTPError"
import { defaultLogger } from "../../shared/logging/Logger"
import { Character } from "../../shared/models/Character"

/**
 * A http controller for the character collection endpoint
 * 
 * @export
 * @class CharacterCollectionController
 * @extends {HTTPController}
 */
export class CharacterCollectionController extends HTTPController {

	/**
	 * Head request to check number of chracters
	 * 
	 * Exposed at HEAD /characters
	 * 
	 * @param {Express.Request} req
	 * @param {Express.Response} res
	 * 
	 * @memberOf CharacterCollectionController
	 */
	head(req: Express.Request, res: Express.Response): void {
		
		let searchterm = req.query.searchterm || "",
			hair_colors = req.query.hair_colors || [],
			skin_colors = req.query.skin_colors || [],
			eye_colors = req.query.eye_colors || []

		var search_values = {}

		if ( searchterm.length > 0 ) {
			search_values['name'] = {
				'$regex': searchterm,
				'$options': '-i'
			}
		}

		if ( hair_colors.length > 0 ) {
			search_values['hair_color'] = {
				'$in': hair_colors
			}
		}

		if ( skin_colors.length > 0 ) {
			search_values['skin_color'] = {
				'$in': skin_colors
			}
		}

		if ( eye_colors.length > 0 ) {
			search_values['eye_color'] = {
				'$in': eye_colors
			}
		}

		Character.find(search_values).count()
			.then((result) => {

				res.setHeader("Content-Type", `application/json; charset=UTF-8; ${result}`)
				res.status(200).send()

			})
			.catch((error) => {

				defaultLogger.log(defaultLogger.levels.error, error)

				res
					.status(500)
					.json({
						type: "unknown",
						error: "An unknown error occured"
					})

			})

	}

    /**
	 * List out Characters
	 * 
	 * Exposed at GET /characters
	 * 
	 * @param {Express.Request} req
	 * @param {Express.Response} res
	 * 
	 * @memberOf CharacterCollectionController
	 */
	get(req: Express.Request, res: Express.Response): void {
		
		let searchterm = req.query.searchterm || "",
			hair_colors = req.query.hair_colors || [],
			skin_colors = req.query.skin_colors || [],
			eye_colors = req.query.eye_colors || [],
			page = parseInt(req.query.page || 0),
			size = parseInt(req.query.size || 5)

		var search_values = {}

		if ( searchterm.length > 0 ) {
			search_values['name'] = {
				'$regex': searchterm,
				'$options': '-i'
			}
		}

		if ( hair_colors.length > 0 ) {
			search_values['hair_color'] = {
				'$in': hair_colors
			}
		}

		if ( skin_colors.length > 0 ) {
			search_values['skin_color'] = {
				'$in': skin_colors
			}
		}

		if ( eye_colors.length > 0 ) {
			search_values['eye_color'] = {
				'$in': eye_colors
			}
		}

		Character.find(search_values).skip(page*size).limit(size)
			.then((characters) => {

				return characters.map((character) => {

					return character.toResponse()

				})

			})
			.then((data) => {

				res.status(200).json(data)

			})
			.catch((error) => {

				defaultLogger.log(defaultLogger.levels.error, error)

				res
					.status(500)
					.json({
						type: "unknown",
						error: "An unknown error occured"
					})

			})

	}

	 /**
	 * Create a character
	 * 
	 * Exposed at POST /characters
	 * 
	 * @param {Express.Request} req
	 * @param {Express.Response} res
	 * 
	 * @memberOf CharacterCollectionController
	 */
	post(req: Express.Request, res: Express.Response): void {
		
		Bluebird.all([
			// Would usally use a validation method here to validate inputs, but its just unessesary for this
		])
			.then(() => {

				return Character.create(req.body)

			})
			.then((data) => {

				res.status(201).json(data.toResponse())

			})
			.catch((error) => {

				defaultLogger.log(defaultLogger.levels.error, error)

				res
					.status(500)
					.json({
						type: "unknown",
						error: "An unknown error occured"
					})

			})

	}

}