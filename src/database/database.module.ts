import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from 'src/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { host, nameDatabase, username, password, port, url } =
          configService.database;

        return {
          type: 'postgres',
          url,
          host,
          port,
          username,
          password,
          database: nameDatabase,
          ssl: {
            rejectUnauthorized: false,
          },
          synchronize: false,
          autoLoadEntities: false,
        };
      },
    }),
  ],

  exports: [TypeOrmModule],
})
export class DatabaseModule {}
