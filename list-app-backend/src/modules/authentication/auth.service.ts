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

    // async signupLocal(dto: AuthDto): Promise<Tokens> {
    //     const hash = await argon.hash(dto.password);

    //     const user = await this.prisma.user
    //     .create({
    //         data: {
    //         email: dto.email,
    //         hash,
    //         },
    //     })
    //     .catch((error) => {
    //         if (error instanceof PrismaClientKnownRequestError) {
    //         if (error.code === 'P2002') {
    //             throw new ForbiddenException('Credentials incorrect');
    //         }
    //         }
    //         throw error;
    //     });

    //     const tokens = await this.getTokens(user.id, user.email);
    //     await this.updateRtHash(user.id, tokens.refresh_token);

    //     return tokens;
    // }

    async signinLocal(dto: AuthDTO): Promise<Tokens> {
        const user = await this.usersService.findOne(dto.email)
        // const user = await this.prisma.user.findUnique({
        //     where: {
        //         email: dto.email,
        //     },
        // });

        if (!user) throw new ForbiddenException('Access Denied')

        const passwordMatches = await this.verify(user, dto)
        // const passwordMatches = await argon.verify(user.hash, dto.password)
        if (!passwordMatches) throw new ForbiddenException('Access Denied')

        const tokens = await this.getTokens(user.userId, user.email)
        await this.usersService.updateRtHash(user.userId, tokens.refresh_token)

        return tokens
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

    async logout(userId: string): Promise<boolean> {
        await this.usersService.updateRtHash(userId, null)
        return true;
    }

    async refreshTokens(userId: string, rt: string): Promise<Tokens> {
        const user = await this.usersService.findOneById(userId)
        // const user = await this.prisma.user.findUnique({
            // where: {
            //     id: userId,
            // },
        // })
        if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied')

        const rtMatches = await this.verifyRt(user, rt)
        if (!rtMatches) throw new ForbiddenException('Access Denied')

        // const rtMatches = await argon.verify(user.hashedRt, rt)
        // if (!rtMatches) throw new ForbiddenException('Access Denied')

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