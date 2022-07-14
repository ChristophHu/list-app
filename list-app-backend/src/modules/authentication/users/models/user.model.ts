import { ApiProperty } from '@nestjs/swagger'

export class User {
    userId: string
    
    @ApiProperty()
    email: string

    @ApiProperty()
    password: string

    @ApiProperty()
    hashedRt: string
}