import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "./create-user.dto";
import {UserInterface} from "../user.interface";
import {LoginUserDto} from "./login-user.dto";

@Injectable()
export class DtoHelperService {

    createUserDtoToEntity(createUserDto: CreateUserDto): UserInterface {
        return {
            email: createUserDto.email,
            password: createUserDto.password,
            username: createUserDto.username
        };
    }

    loginUserDtoToEntity(loginUserDto: LoginUserDto): UserInterface {
        return {
            email: loginUserDto.email,
            password: loginUserDto.password
        };
    }
}