import { Module } from '@nestjs/common';
import {AuthService} from "./services/auth.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {JwtAuthGuard} from "./guards/jwt.guard";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async(configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: '10000s'
                }
            })
        })
    ],
    providers: [AuthService, JwtService, JwtAuthGuard],
    exports: [AuthService]
})
export class AuthModule {}
