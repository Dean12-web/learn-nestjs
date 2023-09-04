import {JwtModuleOptions, JwtSignOptions} from '@nestjs/jwt';

export const jwtConfig : JwtModuleOptions = {
    secret: 'Dean12web',
    signOptions:{
        expiresIn:60 // Token expire in 1 minutes
    },
};

export const refreshTokenConfig: JwtSignOptions = {
    expiresIn : 3600 * 24
};