import { ApiProperty } from "@nestjs/swagger"

export enum COMPLETE {
    true = 'true',
    false = 'false',
}

export class Item {
    @ApiProperty()
    id      : string
    @ApiProperty()
    id_list : string
    @ApiProperty()
    title   : string
    @ApiProperty()
    description: string
    // @ApiProperty({ enum: COMPLETE, example: COMPLETE.false, default: COMPLETE.false })
    @ApiProperty({ example: false, default: false })
    complete: COMPLETE
}

export class Comp {
    @ApiProperty()
    complete: boolean
}