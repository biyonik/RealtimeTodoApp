import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './auth/auth.module';
import {TodoModule} from './todo/todo.module';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthMiddleware} from "./auth.middleware";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: true
        }),
        AuthModule,
        TodoModule,
        UserModule
    ],
})
export class AppModule implements NestModule {

    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(AuthMiddleware)
            .exclude({
                path: '/users',
                method: RequestMethod.POST
            }, {
                path: '/users/login',
                method: RequestMethod.POST
            }).forRoutes('');
    }
}
