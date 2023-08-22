import { ApiProperty } from "@nestjs/swagger";



export class LoginResponse {
    @ApiProperty({
        description: 'Access Token',
        required: true,
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    })
    public accessToken?: string;

    @ApiProperty({
        description: 'Refreshe Token',
        required: true,
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    })
    public refreshToken?: string;

    @ApiProperty({
        description: 'If is new account return isNewSignup is true',
        required: false,
        example: true
    })
    public isNewSignup?: boolean;
}
