import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


// make Jwt Guard Global
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {

}