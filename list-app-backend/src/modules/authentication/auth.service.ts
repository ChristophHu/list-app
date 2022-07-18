import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './models/auth.models';
import { JwtPayload } from './models/jwtpayload.type';
import { Tokens } from './models/tokens.type';
import { User } from './users/models/user.model';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        // private prisma: PrismaService,
        private jwtService: JwtService,
        private config: ConfigService,
    ) {}

    async signup(dto: AuthDTO): Promise<Tokens> {
        const user = await this.usersService.findOne(dto.email)
        if (user) throw new ForbiddenException('Access Denied')

        const newUser = await this.usersService.createOne(dto.email, dto.password)

        const tokens = await this.getTokens(newUser.userId, newUser.email)
        await this.usersService.updateRtHash(newUser.userId, tokens.refresh_token)

        return tokens
    }

    async signin(dto: AuthDTO): Promise<Tokens> {
        const user = await this.usersService.findOne(dto.email)
        if (!user) throw new ForbiddenException('Access Denied')

        const passwordMatches = await this.verify(user, dto)
        if (!passwordMatches) throw new ForbiddenException('Access Denied')

        const tokens = await this.getTokens(user.userId, user.email)
        await this.usersService.updateRtHash(user.userId, tokens.refresh_token)

        return tokens
    }

    async logout(userId: string): Promise<boolean> {
        await this.usersService.updateRtHash(userId, null)
        return true;
    }

    async verify(user: User, dto: AuthDTO): Promise<boolean> {
        if (user && user.password === dto.password) {
            const { password, ...result } = user
            return true
        } else {
            return false
        }
    }

    async verifyRt(user: User, rt: string): Promise<boolean> {
        if (user && user.hashedRt == rt) {
            return true
        } else {
            return false
        }
    }

    async whoami(sub: string): Promise<User> {
        return await this.usersService.findOneById(sub)
    }

    async refreshTokens(request: any): Promise<Tokens> {
        const userId = request.user.userId
        const rt = request.rawHeaders[request.rawHeaders.indexOf('Authorization')+1].slice(7)

        const user = await this.usersService.findOneById(userId)
        if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied')

        const rtMatches = await this.verifyRt(user, rt)
        if (!rtMatches) throw new ForbiddenException('Access Denied')

        const tokens = await this.getTokens(user.userId, user.email)
        await this.usersService.updateRtHash(user.userId, tokens.refresh_token)

        return tokens
    }

    async getTokens(userId: string, email: string): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            sub: userId,
            email: email,
        }

        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get<string>('AT_SECRET'),
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get<string>('RT_SECRET'),
                expiresIn: '7d',
            }),
        ])

        return {
            access_token: at,
            refresh_token: rt,
        }
    }
}