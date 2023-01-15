import { GraphQLModule } from '@nestjs/graphql';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import config from './common/configs/config';
import { AuthModule } from './auth/auth.module';
import { loggingMiddleware } from './common/middleware/logging.middleware';
import { GqlConfigService } from './gql-config.service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [config] }),
        PrismaModule.forRoot({
            isGlobal: true,
            prismaServiceOptions: {
                middlewares: [loggingMiddleware(new Logger('PrismaMiddleware'))], // configure your prisma middleware
            },
        }),

        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            useClass: GqlConfigService,
        }),

        AuthModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
