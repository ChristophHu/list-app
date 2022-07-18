import { Injectable } from '@nestjs/common'
import { User } from './models/user.model'

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: '1',
            email: '24',
            password: 'pa',
            hashedRt: ''
        }
    ]

    async createOne(email: string, password: string): Promise<User> {
        const newUser: User = { userId: '3', email, password, hashedRt: '' }
        this.users.push(newUser)
        return newUser
    }

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
}