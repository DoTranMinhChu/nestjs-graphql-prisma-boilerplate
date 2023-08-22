import { lowerCaseTransformer } from "@common/transformers/lower-case.transformer";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty } from 'class-validator';

export class LoginInAppRequest {
    @ApiProperty({
        description: 'The username for login',
        required: true,
        example: 'username',
    })
    @IsNotEmpty()
    @Transform(lowerCaseTransformer)
    public username!: string;

    @ApiProperty({
        description: 'password',
        required: true,
    })
    @IsNotEmpty()
    public password!: string;
}
