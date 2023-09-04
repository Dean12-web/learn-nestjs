import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interface/login-response.interface';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entity/user.entity';
import { RefreshToken } from './entity/refresh-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { refreshTokenConfig } from 'src/config/jwt.config';
import { RefreshAccesTokenDto } from './entity/refresh-access-token.dto';
import {TokenExpiredError} from 'jsonwebtoken'
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
        @InjectRepository(RefreshTokenRepository)
        private readonly refreshTokenRepository: RefreshTokenRepository,
    ) { }
    async login(loginDto: LoginDto): Promise<LoginResponse> {
        const { email, password } = loginDto;

        const user = await this.usersService.validateUser(email, password)

        if (!user) {
            throw new UnauthorizedException('Wrong Email Or Password')
        }

        const access_token = await this.createAccesToken(user)
        const refresh_token = await this.createRefreshToken(user)

        return { access_token, refresh_token } as LoginResponse
    }

    async refreshAccesToken(refreshTokenDto: RefreshAccesTokenDto): Promise<{access_token : string}>{
        const {refresh_token} = refreshTokenDto
        const payload = await this.decodeToken(refresh_token)
        const refreshToken = await this.refreshTokenRepository.findOne(payload.jid, {relations: ['user']})
        if(!refreshToken){
            throw new UnauthorizedException('Refresh Token is not found')
        }
        if(refreshToken.isRevoke){
            throw new UnauthorizedException('Refresh Token Has Been revoked')
        }

        const access_token = await this.createAccesToken(refreshToken.user)

        return {access_token}
    }

    async decodeToken(token:string):Promise<any>{
        try {
            return await this.jwtService.verifyAsync(token)
        } catch (error) {
            if(error instanceof TokenExpiredError){
                throw new UnauthorizedException('Refresh Token is Expired')
            }else{
                throw new InternalServerErrorException('Failed to decoded token')
            }
        }
    }

    async createAccesToken(user: User): Promise<string> {
        const payload = {
            sub: user.id
        }
        const access_token = await this.jwtService.signAsync(payload)

        return access_token;
    }

    async createRefreshToken(user: User): Promise<string> {
        const refreshToken = await this.refreshTokenRepository.createRefreshToken(user, +refreshTokenConfig.expiresIn)
        const payload = {
            jid: refreshToken.id
        }
        const refresh_token = await this.jwtService.signAsync(payload, refreshTokenConfig)
        return refresh_token;
    }
}
