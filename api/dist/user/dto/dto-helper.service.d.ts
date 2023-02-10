import { CreateUserDto } from "./create-user.dto";
import { UserInterface } from "../user.interface";
import { LoginUserDto } from "./login-user.dto";
export declare class DtoHelperService {
    createUserDtoToEntity(createUserDto: CreateUserDto): UserInterface;
    loginUserDtoToEntity(loginUserDto: LoginUserDto): UserInterface;
}
