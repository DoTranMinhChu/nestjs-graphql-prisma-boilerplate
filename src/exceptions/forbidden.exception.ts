
import { BaseException } from "./base.exception"
import { IOptionException } from "./exception.interface"
import { HttpStatus } from "@nestjs/common"

export class ForbiddenException extends BaseException {
    constructor(_options?: IOptionException) {
        const className = ForbiddenException.name;
        super(
            Object.assign({
                message: className,
                statusCode: HttpStatus.FORBIDDEN,
                type: className
            }, _options
            )
        )
    }
}