import { Injectable } from '@nestjs/common';
import { Item } from 'src/core/models/item.model';

@Injectable()
export class ItemService {
    private items: Item[] = [
        { id: '100', id_list: '1', title: 'first title', description: 'first description', complete: false }
    ]

    async getItems() {
        return await this.items
    }

    async getItemById(id: string) {
        return await this.items.filter((el: Item) => el.id == id)
    }

    async createItem(item: Item): Promise<Item> {
        this.items.push(item)
        return item
    }

    async deleteItem(id: string): Promise<any> {
        this.items = this.items.filter((el: Item) => el.id != id)
        return true
    }

    async updateItemComplete(id: string, complete: boolean): Promise<void> {
        let item = await this.getItemById(id)
        item[0].complete = complete
        this.items = this.items.filter((item: Item) => item.id != id)
        this.items.push(item[0])
    }
}
