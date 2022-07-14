import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private _authService: AuthService, private _usersService: UsersService) {
    console.log('local')
    super()
  }

  async validate(email: string, password: string): Promise<any> {
    // console.log(email)
    // const user = await this._usersService.findOne(email)
    // console.log(user)
    // if (!user) throw new UnauthorizedException()

    // const passwordMatches = await this._authService.verify(user, { email, password })
    // if (!passwordMatches) throw new UnauthorizedException()

    // // const user = await this.authService..validateUser(username, password);
    // return user
    return null
  }
}