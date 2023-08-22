
import { BaseException } from "./base.exception"
import { IOptionException } from "./exception.interface"
import { HttpStatus } from "@nestjs/common"

export class NotAcceptableException extends BaseException {
    constructor(_options?: IOptionException) {
        const className = NotAcceptableException.name;
        super(
            Object.assign({
                message: className,
                statusCode: HttpStatus.NOT_ACCEPTABLE,
                type: className
            }, _options
            )
        )
    }
}