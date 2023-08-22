import { IException } from "./exception.interface"



export class BaseException extends Error {

    constructor(_options: IException) {
        super()
        this.options = Object.assign({
        }, _options)
    }


    options: IException

    toJSON() {
        return this.options
    }
}