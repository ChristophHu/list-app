import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: '1',
            email: '24',
            password: 'pa',
            hashedRt: ''
        },
        {
            userId: '2',
            email: '24225131',
            password: 'password',
            hashedRt: ''
        }
    ];

    async findOne(email: string): Promise<User> {
        return this.users.find(user => user.email === email)
    }
    async findOneById(id: string): Promise<User> {
        return this.users.find(user => user.userId === id)
    }
    async updateRtHash(id: string, rt: string): Promise<void> {
        this.users.forEach((user: User) => {
            if(user.userId == id) {
                user.hashedRt = rt
                return null
            }
        })
    }

    // async getRole(username: string): Promise<String | undefined> {
    //     const user = this.users.find(user => user.username === username)
    //     return user.role
    // }
}