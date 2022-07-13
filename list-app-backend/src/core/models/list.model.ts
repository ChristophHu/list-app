import { ApiProperty } from "@nestjs/swagger"
import { Item } from "./item.model"

export class List {
    @ApiProperty({
        description: 'id',
        minimum: 1,
        default: 1,
        type: [String]
    })
    id      : string
    @ApiProperty({
        description: 'id',
        minimum: 8
    })
    id_user : string
    @ApiProperty({
        description: 'can have some items'
    })
    items   : Item[]
}