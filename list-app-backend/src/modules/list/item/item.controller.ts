import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { COMPLETE, Item } from 'src/core/models/item.model';
import { ItemService } from './item.service';

export enum UserRole {
    Admin = 'Admin',
    Moderator = 'Moderator',
    User = 'User',
}

@ApiTags('list-item')
@Controller('item')
export class ItemController {
    constructor( private _ItemService: ItemService ) {}

    @Get('list/item/')
    @ApiResponse({ status: 200, description: 'All items listed.' })
    async getItems(): Promise<Item[]> {
        return await this._ItemService.getItems()
    }

    @Get('list/item/:id')
    @ApiParam({name: 'id'})
    @ApiResponse({ status: 200, description: 'Item returned.'})
    async getItemById(@Param('id') id: string): Promise<any> {
        return await this._ItemService.getItemById(id)
    }

    @Post()
    @ApiBody({
        type: Item,
        description: 'Store item structure'
    })
    @ApiResponse({ status: 201, description: 'Item created.'})
    async createItem(@Body() item: Item): Promise<any> {
        return await this._ItemService.createItem(item)
    }

    @Patch('list/item/:id/complete')
    @ApiParam({name: 'id'})
    @ApiQuery({ name: 'complete', enum: COMPLETE })
    @ApiResponse({ status: 200, description: 'Item updated.'})
    async updateItemComplete(@Param('id') id: string, @Query('complete') complete: COMPLETE = COMPLETE.false): Promise<void> {
        await this._ItemService.updateItemComplete(id, complete)
    }

    @ApiParam({name: 'id'})
    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Item deleted.'})
    deleteItem(@Param('id') id) {
        this._ItemService.deleteItem(id)
    }

    
    // @Put()
    // @ApiQuery({ name: 'role', enum: UserRole })
    // @ApiResponse({ status: 200, description: 'Is deleted.' })
    // async filterByRole(@Query('role') role: UserRole = UserRole.User) {

    // }
}
