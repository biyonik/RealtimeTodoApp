import { User } from '../entities/user.entity';
import { Repository } from "typeorm";
import { AuthService } from "../../auth/services/auth.service";
import { UserInterface } from "../user.interface";
export declare class UserService {
    private readonly userRepository;
    private authService;
    constructor(userRepository: Repository<User>, authService: AuthService);
    create(newUser: UserInterface): Promise<UserInterface>;
    login(user: UserInterface): Promise<string>;
    private findByEmail;
    private findOne;
    private mailExists;
    private usernameExists;
}
