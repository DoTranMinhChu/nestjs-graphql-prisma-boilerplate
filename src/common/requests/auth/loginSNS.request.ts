import { ApiProperty } from "@nestjs/swagger";
import { LoginType } from "@prisma/client";

export class LoginSNSRequest {
    @ApiProperty({
        description: 'SNS token, exmample google token, firebase token,...',
        required: true,
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    })
    public token!: string

    @ApiProperty({
        description: 'SNS token, exmample google token, firebase token,...',
        required: true,
        enum: Object.values(LoginType),
        example: LoginType.GOOGLE
    })
    public loginType!: LoginType
}

