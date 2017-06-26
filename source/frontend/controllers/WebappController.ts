import { HTTPController } from "../../shared/HTTP/HTTPController"
import * as Express from "express"

export class WebappController extends HTTPController {

    get(req: Express.Request, res: Express.Response): void {
        
        res.render("application/webapp")

    }

}