import {Module} from '@nestjs/common';
import {AuthService} from "./services/auth.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {JwtAuthGuard} from "./guards/jwt.guard";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '10000s'}
        })
    ],
    providers: [AuthService, JwtService, JwtAuthGuard, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {
}
