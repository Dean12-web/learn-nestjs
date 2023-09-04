import { User } from "src/users/entity/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RefreshToken extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // access token yang dibuat bisa di revoke, sehingga ketika client melakukan refresh token sedangkan refresh token sudah direvoke, 
    //token tidak bisa digunakan kembali
    @Column()
    isRevoke: boolean;

    @Column()
    expiredAt: Date;

    @ManyToOne(() => User, (user) => user.refreshTokens)
    user: User;
} 