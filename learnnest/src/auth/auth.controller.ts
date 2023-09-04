import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interface/login-response.interface';
import { RefreshAccesTokenDto } from './entity/refresh-access-token.dto';

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
}
