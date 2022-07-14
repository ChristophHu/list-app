import { Injectable } from '@nestjs/common';
import { List } from 'src/core/models/list.model';

@Injectable()
export class ListService {
    private lists: List[] = [
        { id: '1', id_user: '24225132', items: [
            { id: '100', id_list: '1', title: 'first title', description: 'first description', complete: false }
        ]}
    ]

    async getLists(): Promise<List[]> {
        return await this.lists
    }

    async getListById(id: string) {
        return await this.lists.filter((el: List) => el.id == id)
    }

    async getListByUserId(user_id: string) {
        return await this.lists.filter((el: List) => el.id_user == user_id)
    }
}
