import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interface/login-response.interface';
import { RefreshAccesTokenDto } from './entity/refresh-access-token.dto';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservice: AuthService){}

    @Post('login')
    async login(@Body() loginDto:LoginDto):Promise<LoginResponse>{
        return this.authservice.login(loginDto);
    }

    @Post('Refresh-token')
    async refreshToken(@Body() refreshTokenDto : RefreshAccesTokenDto): Promise<{access_token:string}>{
        return this.authservice.refreshAccesToken(refreshTokenDto )
    }

    @Patch('/:id/revoke')
    @UseGuards(JwtGuard)
    async revokeRefreshToken(@Param('id')id:string):Promise<void> {
        return this.authservice.revokeRefreshToken(id)
    }
}
