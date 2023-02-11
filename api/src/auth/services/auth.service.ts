import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UserInterface} from "../../user/user.interface";
const bcrypt = require("bcrypt");

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async generateJwt(user: UserInterface): Promise<string> {
        return this.jwtService.signAsync({user},{secret:process.env.JWT_SECRET});
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    async comparePasswords(password: string, storedPasswordHash: string): Promise<boolean> {
        return bcrypt.compare(password, storedPasswordHash);
    }

    async verifyJwt(jwt: string): Promise<any> {
        return this.jwtService.verifyAsync(jwt);
    }
}
