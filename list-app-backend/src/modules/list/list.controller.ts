import { Controller, Get, Param } from '@nestjs/common';
import { List } from 'src/core/models/list.model';
import { ListService } from './list.service';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('list')
// @ApiHeader({
//     name: 'My Header',
//     description: 'A Custom Header'
// })
@Controller('list')
export class ListController {

    constructor( private _ListService: ListService ) {}

    @Get()
    @ApiOperation({ summary: 'all lists', description: 'Get all lists.' })
    @ApiResponse({ status: 200, description: 'Returns all lists.' })
    @ApiResponse({ status: 403, description: 'Forbidden'})
    async getLists(): Promise<List[]> {
        return await this._ListService.getLists()
    }

    @ApiParam({name: 'id'})
    @Get(':id')
    async getListById(@Param('id') id: string): Promise<any> {
        return await this._ListService.getListById(id)
    }

    @ApiParam({name: 'user_id'})
    @Get('user/:user_id')
    async getListByUserId(@Param('user_id') user_id: string): Promise<any> {
        return await this._ListService.getListByUserId(user_id)
    }
}
