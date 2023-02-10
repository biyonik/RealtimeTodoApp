import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { DtoHelperService } from "../dto/dto-helper.service";
import { UserInterface } from "../user.interface";
import { LoginUserDto } from "../dto/login-user.dto";
import { LoginResponseInterface } from "../login-response.interface";
export declare class UserController {
    private readonly userService;
    private dtoHelperService;
    constructor(userService: UserService, dtoHelperService: DtoHelperService);
    create(createUser: CreateUserDto): Promise<UserInterface>;
    login(loginUser: LoginUserDto): Promise<LoginResponseInterface>;
}
