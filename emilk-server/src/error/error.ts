import {HttpError} from 'routing-controllers'

export class Error extends HttpError {

    constructor(httpCode: number, message: string) {
        super(httpCode, message)
        Object.setPrototypeOf(this, Error.prototype)
    }

    toJSON() {
        return {
            timestamp: new Date(),
            message: this.message
        }
    }

}
