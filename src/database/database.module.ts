import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from 'src/config';
import { Category } from 'src/entities/category.entity';
import { Notes } from 'src/entities/notes.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { host, nameDatabase, username, password, port, url } =
          configService.database;

        return {
          url,
          type: 'postgres',
          host,
          port,
          username,
          password,
          database: nameDatabase,
          ssl: {
            rejectUnauthorized: false,
          },
          //   entities: [Notes, Category],
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],

  exports: [TypeOrmModule],
})
export class DatabaseModule {}
