import { ApiProperty } from '@nestjs/swagger'

export class RefreshDTO {
    @ApiProperty()
    userId: string
    
    @ApiProperty()
    hashedRt: string
}