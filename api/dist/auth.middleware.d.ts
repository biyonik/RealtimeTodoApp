import { NestMiddleware } from "@nestjs/common";
import { AuthService } from "./auth/services/auth.service";
import { UserService } from "./user/services/user.service";
import { NextFunction } from "express";
import { UserInterface } from "./user/user.interface";
export interface RequestModel {
    user: UserInterface;
    headers: any;
}
export declare class AuthMiddleware implements NestMiddleware {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    use(request: RequestModel, response: Response, next: NextFunction): Promise<any>;
}
