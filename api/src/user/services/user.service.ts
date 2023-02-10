import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from '../entities/user.entity';
import {Repository} from "typeorm";
import {AuthService} from "../../auth/services/auth.service";
import {UserInterface} from "../user.interface";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private authService: AuthService
    ) {}

    async create(newUser: UserInterface): Promise<UserInterface> {
        const emailExists = await this.mailExists(newUser.email);
        const usernameExists = await this.usernameExists(newUser.username);

        if (emailExists  === false && usernameExists === false) {
            const passwordHash: string = await this.authService.hashPassword(newUser.password);
            newUser.password = passwordHash;
            newUser.email = newUser.email.toLowerCase();
            newUser.username = newUser.username.toLowerCase();
            const entity = this.userRepository.create(newUser);
            const user = await this.userRepository.save(entity);
            return this.findOne(user.id);

        } else {
            throw new HttpException('Email or username already taken!', HttpStatus.CONFLICT);
        }
    }

    async login(user: UserInterface): Promise<string> {
        const foundedUser: UserInterface = await this.findByEmail(user.email);
        if (foundedUser) {
            const passwordsMathing: boolean = await this.authService.comparePasswords(user.password, foundedUser.password);
            if (passwordsMathing === true) {
                const payload: UserInterface = await this.findOne(foundedUser.id);
                return this.authService.generateJwt(payload);
            } else {
                throw new HttpException('Login was not successfull, wrong credentials!', HttpStatus.UNAUTHORIZED);
            }
        } else {
            throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
        }
    }

    private async findByEmail(email: string): Promise<UserInterface> {
        return this.userRepository.findOne({
            where: {email},
            select: ['id', 'email', 'password', 'username']
        });
    }

    private async findOne(id: string): Promise<UserInterface> {
        return this.userRepository.findOne({
            where: {id}
        });
    }

    private async mailExists(email: string): Promise<boolean> {
        const user= await this.userRepository.findOne({
            where: {email}
        });
        return !!user;
    }

    private async usernameExists(username: string): Promise<boolean> {
        const user = await this.userRepository.findOne({
            where: {username}
        });
        return !!user;
    }
}
