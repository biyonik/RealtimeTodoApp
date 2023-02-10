import { JwtService } from "@nestjs/jwt";
import { UserInterface } from "../../user/user.interface";
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    generateJwt(user: UserInterface): Promise<string>;
    hashPassword(password: string): Promise<string>;
    comparePasswords(password: string, storedPasswordHash: string): Promise<boolean>;
    verifyJwt(jwt: string): Promise<any>;
}
