import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class Item {
    @ApiPropertyOptional()
    id      : string
    @ApiProperty()
    id_list : string
    @ApiProperty()
    title   : string
    @ApiPropertyOptional()
    description: string
    @ApiProperty({ example: false, default: false })
    complete: boolean
}