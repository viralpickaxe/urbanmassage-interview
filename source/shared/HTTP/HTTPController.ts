import * as Express from "express"

export class HTTPController {

    /**
     * Creates an instance of HTTPController.
     * 
     * @param {Express.IRoute} router
     * 
     * @memberOf HTTPController
     */
    constructor(protected router: Express.IRoute) {

        // Register the four routes defined in the controller to the router
        // Bind context forcefully to evade express' attempts to remove it
        router.get(this.get.bind(this))

        router.post(this.post.bind(this))

        router.patch(this.patch.bind(this))

        router.delete(this.delete.bind(this))

        router.head(this.head.bind(this))

    }

    /**
     * The route handler assigned to process GET requests to this controller.
     * 
     * @param {Express.Request} req
     * @param {Express.Response} res
     * 
     * @memberOf HTTPController
     */
    get(req: Express.Request, res: Express.Response): void {

        res.sendStatus(403)

    }

    /**
     * The route handler assigned to process POST requests to this controller.
     * 
     * @param {Express.Request} req
     * @param {Express.Response} res
     * 
     * @memberOf HTTPController
     */
    post(req: Express.Request, res: Express.Response): void {

        res.sendStatus(403)

    }

    /**
     * The route handler assigned to process PATCH requests to this controller.
     * 
     * @param {Express.Request} req
     * @param {Express.Response} res
     * 
     * @memberOf HTTPController
     */
    patch(req: Express.Request, res: Express.Response): void {

        res.sendStatus(403)

    }

    /**
     * The route handler assigned to process DELETE requests to this controller.
     * 
     * @param {Express.Request} req
     * @param {Express.Response} res
     * 
     * @memberOf HTTPController
     */
    delete(req: Express.Request, res: Express.Response): void {

        res.sendStatus(403)

    }

    /**
     * The route handler assigned to process HEAD requests to this controller.
     * 
     * @param {Express.Request} req
     * @param {Express.Response} res
     * 
     * @memberOf HTTPController
     */
    head(req: Express.Request, res: Express.Response): void {

        res.sendStatus(403)

    }

}