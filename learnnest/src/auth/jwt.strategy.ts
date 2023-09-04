import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConfig } from "src/config/jwt.config";
import { UsersService } from "src/users/users.service";

// jwt strategy berisikan informasi bagaimana cara kita mengestrak token kita, setelah di ekstrak kita ambil usernya
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService:UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: jwtConfig.secret

        })
    }

    async validate(payload:any){
        const user = await this.usersService.getUserById(payload.sub)
        if(!user){
            throw new UnauthorizedException('User is not found')
        }

        return user;
    }
}
