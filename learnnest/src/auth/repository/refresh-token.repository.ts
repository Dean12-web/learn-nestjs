import { EntityRepository, Repository } from "typeorm";
import { RefreshToken } from "../entity/refresh-token.entity";
import { User } from "src/users/entity/user.entity";

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken>{
    async createRefreshToken(user:User, ttl: number): Promise<RefreshToken>{
        const refreshToken = this.create()
        refreshToken.user = user
        refreshToken.isRevoke = false
        const expiredAt = new Date()
        expiredAt.setTime(expiredAt.getTime() + ttl)
        refreshToken.expiredAt = expiredAt

        return await refreshToken.save()
    }
}