import { ApiProperty } from "@nestjs/swagger";



export class LoginInAppRequest {
    @ApiProperty({
        description: 'The username for login',
        required: true,
        example: 'username',
    })
    public username!: string;

    @ApiProperty({
        description: 'password',
        required: true,
    })
    public password!: string;
}
