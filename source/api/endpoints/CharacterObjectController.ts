import * as Express from "express"
import * as Bluebird from "bluebird"
import { HTTPController } from "../../shared/HTTP/HTTPController"
import { HTTPError } from "../../shared/HTTP/HTTPError"
import { defaultLogger } from "../../shared/logging/Logger"
import { Character } from "../../shared/models/Character"

/**
 * A http controller for the character object endpoint
 * 
 * @export
 * @class CharacterObjectController
 * @extends {HTTPController}
 */
export class CharacterObjectController extends HTTPController {

    /**
	 * Get a single character
	 * 
	 * Exposed at GET /characters/:id
	 * 
	 * @param {Express.Request} req
	 * @param {Express.Response} res
	 * 
	 * @memberOf CharacterObjectController
	 */
	get(req: Express.Request, res: Express.Response): void {
		
		Character.findOne({
            _id: req.params.id
        })
			.then((character) => {

                res.status(200).json(character.toResponse())

			})
			.catch(() => {

				res.status(404).json({
                    type: "not_found",
                    message: "Character not found"
                })

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
	 * Update a character
	 * 
	 * Exposed at PATH /characters/:id
	 * 
	 * @param {Express.Request} req
	 * @param {Express.Response} res
	 * 
	 * @memberOf CharacterObjectController
	 */
	patch(req: Express.Request, res: Express.Response): void {
		
		console.log('hi')

		Character.findOne({
            _id: req.params.id
        })
			.then((character) => {

                if( req.body.name !== undefined ) character.name = req.body.name
				if( req.body.height !== undefined ) character.height = req.body.height
				if( req.body.mass !== undefined ) character.mass = req.body.mass
				if( req.body.hair_color !== undefined ) character.hair_color = req.body.hair_color
				if( req.body.skin_color !== undefined ) character.skin_color = req.body.skin_color
				if( req.body.eye_color !== undefined ) character.eye_color = req.body.eye_color
				if( req.body.birth_year !== undefined ) character.birth_year = req.body.birth_year
				if( req.body.is_male !== undefined ) character.is_male = req.body.is_male
				if( req.body.is_fav !== undefined ) character.is_fav = req.body.is_fav

				return character.save()

			})
			.then((character) => {

                res.status(200).json(character.toResponse())

			})
			.catch(() => {

				res.status(404).json({
                    type: "not_found",
                    message: "Character not found"
                })

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