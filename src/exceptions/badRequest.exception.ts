
import { ApiProperty } from "@nestjs/swagger";
import { BaseException } from "./base.exception"
import { IOptionException } from "./exception.interface"
import { HttpStatus } from "@nestjs/common"

export class BadRequestException extends BaseException {
    @ApiProperty({
        type: "number",
        example: 400
    })
    statusCode!: number;

    @ApiProperty({
        type: "string",
        example: "/"
    })
    path!: string;

    @ApiProperty({
        type: "string",
        example: "Bad request exception."
    })
    override message!: string;

    @ApiProperty({
        type: "string",
        example: "BadRequestException"
    })
    type!: string;

    @ApiProperty({
        type: "number",
        example: 400
    })
    codeNumber!: number;


    constructor(_options?: IOptionException) {
        const className = BadRequestException.name;
        super(
            Object.assign({
                message: className,
                statusCode: HttpStatus.BAD_REQUEST,
                type: className
            }, _options
            )
        )
    }

}