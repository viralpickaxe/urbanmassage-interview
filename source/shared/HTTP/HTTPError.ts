export class HTTPError extends Error {
        
    public isHTTPError = true

    constructor(public message: string, public type: string, public http_code: number) {
        super(message);
        }

}