import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export enum COMPLETE {
    true = 'true',
    false = 'false',
}

export class Item {
    @ApiPropertyOptional()
    id      : string
    @ApiProperty()
    id_list : string
    @ApiProperty()
    title   : string
    @ApiPropertyOptional()
    description: string
    // @ApiProperty({ enum: COMPLETE, example: COMPLETE.false, default: COMPLETE.false })
    @ApiProperty({ example: false, default: false })
    complete: COMPLETE
}