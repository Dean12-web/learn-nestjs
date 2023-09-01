import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions ={
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'Dean12',
    password: '12345',
    database: 'cobafeathers',
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: true
}