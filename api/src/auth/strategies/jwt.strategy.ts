import {Strategy, ExtractJwt} from 'passport-jwt';
import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || process.env.JWT_SECRET
        });

        console.log('configService: ', this.configService.get('JWT_SECRET'));
        console.log('process.env: ', process.env.JWT_SECRET);
    }

    async validate(payload: any) {
        return {...payload.user};
    }
}
