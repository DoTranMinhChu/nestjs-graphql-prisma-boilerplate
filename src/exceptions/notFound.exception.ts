
import { BaseException } from "./base.exception"
import { IOptionException } from "./exception.interface"
import { HttpStatus } from "@nestjs/common"

export class NotFoundException extends BaseException {
    constructor(_options?: IOptionException) {
        const className = NotFoundException.name;
        super(
            Object.assign({
                message: className,
                statusCode: HttpStatus.NOT_FOUND,
                type: className
            }, _options
            )
        )
    }
}