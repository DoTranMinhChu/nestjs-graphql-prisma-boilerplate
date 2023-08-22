import { HttpStatus } from "@nestjs/common"

export interface IOptionException {
    exceptionCode?: number,
    message?: string,
    description?: string
}

export interface IException extends IOptionException {
    statusCode: HttpStatus,
    type: string,
    path?: string,
}