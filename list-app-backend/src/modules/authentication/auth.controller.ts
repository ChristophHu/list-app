import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/modules/authentication/decorators/public.decorator';
import { AuthService } from './auth.service';
import { GetCurrentUserId } from './decorators/get-current-user-id.decorator';
import { RtGuard } from './guards/rt.guard';
import { AuthDTO } from './models/auth.models';
import { RefreshDTO } from './models/refresh.model';
import { Tokens } from './models/tokens.type';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
  
    // @Public()
    // @Post('signup')
    // @HttpCode(HttpStatus.CREATED)
    // signupLocal(@Body() dto: AuthDTO): Promise<Tokens> {
    //     return this.authService.signupLocal(dto);
    // }
  
    @Public()
    // @UseGuards(AuthGuard('local'))
    @Post('signin')
    @ApiResponse({ status: 200, description: 'Signed in.'})
    signinLocal(@Body() dto: AuthDTO): Promise<Tokens> {
        return this.authService.signinLocal(dto)
    }
  
    @Post('logout')
    @ApiResponse({ status: 200, description: 'Tokens refreshed.'})
    logout(@GetCurrentUserId() userId: string): Promise<boolean> {
        return this.authService.logout(userId);
    }
  
    // @Public()
    // @UseGuards(RtGuard)
    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('refresh')
    @ApiBearerAuth('refresh_token')
    // @ApiParam({name: 'userId'})
    // @ApiParam({name: 'refreshToken'})
    @ApiResponse({ status: 201, description: 'Tokens refreshed.'})
    refreshTokens(
        @Body() refresh: RefreshDTO
    ): Promise<Tokens> {
        return this.authService.refreshTokens(refresh.userId, refresh.hashedRt)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('whoami')
    @ApiBearerAuth('access_token')
    @ApiResponse({ status: 401, description: 'Unauthorized, access denied.'})
    async whoami(@Req() request): Promise<any> {
        return await this.authService.whoami(request.email)
    }
}

