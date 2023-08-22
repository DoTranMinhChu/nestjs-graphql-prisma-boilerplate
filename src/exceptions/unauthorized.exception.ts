
import { BaseException } from "./base.exception"
import { IOptionException } from "./exception.interface"
import { HttpStatus } from "@nestjs/common"

export class UnauthorizedException extends BaseException {
    constructor(_options?: IOptionException) {
        const className = UnauthorizedException.name;
        super(
            Object.assign({
                message: className,
                statusCode: HttpStatus.UNAUTHORIZED,
                type: className
            }, _options
            )
        )
    }
}