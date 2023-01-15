import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      logging: true,
      type: 'mysql',
      host: '127.0.0.1',
      port: 3307,
      username: 'fluen',
      password: 'fluen',
      database: 'fluen',
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['src/migration/**/*.ts'],
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
