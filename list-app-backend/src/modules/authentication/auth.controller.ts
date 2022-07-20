import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Public } from 'src/modules/authentication/decorators/public.decorator'
import { AuthService } from './auth.service'
import { GetCurrentUserId } from './decorators/get-current-user-id.decorator'
import { AuthDTO } from './models/auth.models'
import { Tokens } from './models/tokens.type'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Public()
    @Post('signup')
    @ApiResponse({ status: 201, description: 'Signed up.'})
    async signupLocal(@Body() dto: AuthDTO): Promise<Tokens> {
        return this.authService.signup(dto)
    }
  
    @Public()
    @Post('signin')
    @ApiResponse({ status: 201, description: 'Signed in.'})
    async signinLocal(@Body() dto: AuthDTO): Promise<Tokens> {
        return this.authService.signin(dto)
    }
  
    @Post('logout')
    @ApiResponse({ status: 200, description: 'Tokens refreshed.'})
    async logout(@GetCurrentUserId() userId: string): Promise<boolean> {
        return this.authService.logout(userId)
    }
  
    @Public()
    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('refresh')
    @ApiBearerAuth('refresh_token')
    @ApiResponse({ status: 201, description: 'Tokens refreshed.'})
    async refreshTokens(@Req() request): Promise<Tokens> {
        return this.authService.refreshTokens(request)
    }

    // @UseGuards(AuthGuard('jwt'))
    @Get('whoami')
    // @ApiBearerAuth('access_token')
    @ApiResponse({ status: 200, description: 'User returned.'})
    @ApiResponse({ status: 401, description: 'Unauthorized, access denied.'})
    async whoami(@Req() request): Promise<any> {
        const user = await this.authService.whoami(request.user.userId)
        return user.email
    }
}

