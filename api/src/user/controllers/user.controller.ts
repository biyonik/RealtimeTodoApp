import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {UserService} from '../services/user.service';
import {CreateUserDto} from '../dto/create-user.dto';
import {DtoHelperService} from "../dto/dto-helper.service";
import {UserInterface} from "../user.interface";
import {LoginUserDto} from "../dto/login-user.dto";
import {LoginResponseInterface} from "../login-response.interface";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService, private dtoHelperService: DtoHelperService) {
    }

    @Post()
    async create(@Body() createUser: CreateUserDto): Promise<UserInterface> {
        const userEntity: UserInterface = this.dtoHelperService.createUserDtoToEntity(createUser);
        return this.userService.create(userEntity);
    }

    @Post('login')
    async login(@Body() loginUser: LoginUserDto): Promise<LoginResponseInterface> {
        const userEntity: UserInterface = this.dtoHelperService.loginUserDtoToEntity(loginUser);
        const jwt: string = await this.userService.login(userEntity);
        return {
            access_token: jwt,
            token_type: 'JWT',
            expires_in: 10000
        }
    }


}
