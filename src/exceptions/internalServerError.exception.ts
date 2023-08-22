
import { BaseException } from "./base.exception"
import { IOptionException } from "./exception.interface"
import { HttpStatus } from "@nestjs/common"

export class InternalServerErrorException extends BaseException {
    constructor(_options?: IOptionException) {
        const className = InternalServerErrorException.name;
        super(
            Object.assign({
                message: className,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                type: className
            }, _options
            )
        )
    }
}