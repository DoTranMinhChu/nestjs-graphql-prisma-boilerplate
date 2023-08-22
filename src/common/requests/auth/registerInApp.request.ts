import { ApiProperty } from "@nestjs/swagger";
import { Gender } from "@prisma/client";


export class RegisterInAppRequest {
    @ApiProperty({
        description: 'Fullname of user',
        required: true,
        example: 'Do Tran Minh Chu',
    })
    public name!: string;


    @ApiProperty({
        description: `Day of birth by format YYYY-MM-DDTHH:mm:ssZ
        </br>
        Example : 2001-10-13T00:00:00+07:00`,
        required: false,
        example: "2001-10-13T00:00:00+07:00"
    })
    public dob!: Date;

    @ApiProperty({
        description: `Gender`,
        required: true,
        example: Gender.MALE,
    })
    public gender!: Gender;

    @ApiProperty({
        description: `Url avatar`,
        required: false,
        example: "https://haycafe.vn/wp-content/uploads/2022/02/anh-meo-cute-hinh-cute-meo.jpg",
    })
    public avatarUrl!: string;

    @ApiProperty({
        description: `Email`,
        required: false,
        example: "dotranminhchu@gmail.com",
    })
    public email!: string;

    @ApiProperty({
        description: `Phone number`,
        required: false,
        example: "0123456789",
    })
    public phone!: string;

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

