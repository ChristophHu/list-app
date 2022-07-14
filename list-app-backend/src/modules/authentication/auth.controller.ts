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
  
    @Public()
    // @UseGuards(RtGuard)
    @Post('refresh')
    // @ApiParam({name: 'userId'})
    // @ApiParam({name: 'refreshToken'})
    @ApiResponse({ status: 201, description: 'Tokens refreshed.'})
    refreshTokens(
        @Body() refresh: RefreshDTO
        // @Param('userId') userId: string,
        // @Param('refreshToken') refreshToken: string,
        // @GetCurrentUserId() userId: string,
        // @GetCurrentUser('refreshToken') refreshToken: string,
    ): Promise<Tokens> {
        return this.authService.refreshTokens(refresh.userId, refresh.hashedRt)
    }

    // @UseGuards(LocalAuthGuard)
    @UseGuards(AuthGuard('jwt'))
    @Get('whoami')
    @ApiBearerAuth()
    // @ApiResponse({ status: 401, description: 'Unauthorized, access denied.'})
    // @ApiResponse({ status: 403, description: 'Forbidden, access denied.'})
    // @UseGuards(AuthGuard('local'))
    async whoami(@Req() request) {
        // console.log(request)
        // return request.user
        return 'Hello'
    }
}

