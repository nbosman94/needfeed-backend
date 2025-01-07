import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from 'src/users/dto/reponse-user.dto';
import { ExistingUserDto } from 'src/users/dto/existing-user.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService){}

    async hassPassword(passowrd:string): Promise<string> {
        return bcrypt.hash(passowrd, 12);
    }

    async validatePasswordMatch(password: string, hashedpassword: string): Promise<boolean>{
        // if (password === hashedpassword){
        //     return true;
        // }
        // else {
        //     return false;
        // }
        return bcrypt.compare(password, hashedpassword);
    }

    async register(user: Readonly<CreateUserDto>): Promise<UserResponseDto | null >{
        const {username, password: initalpassword, email, list} = user;
        const existingUser = await this.usersService.findByEmail(email);
        if(existingUser) throw new HttpException('Account already exists with this email', HttpStatus.CONFLICT);
        const password = await this.hassPassword(initalpassword);
        // Creating a new user with hashedpassword
        const newUser = await this.usersService.create({email, username, password, list})
        return this.usersService.getUserdetails(newUser);
    }

    async validateUser(email: string, password: string): Promise<UserResponseDto | null> {
        const existingUser = await this.usersService.findByEmail(email);
        if(!existingUser) return null;

        const passwordMatch = await this.validatePasswordMatch(password, existingUser.password)
        if(!passwordMatch) return null;

        return this.usersService.getUserdetails(existingUser);

    }

    async login(existingUser: ExistingUserDto ){
        const {email, password} = existingUser;
        const validatedUser = await this.validateUser(email, password);
        if(!validatedUser) throw new HttpException("Credentials are not valid", HttpStatus.UNAUTHORIZED);
        
        const payload = {
            id: validatedUser.id,
            email: validatedUser.email,
            username: validatedUser.username
        }
        
        const jwt = await this.jwtService.signAsync({payload});
        return ({token: jwt});
    }

    async verifyJwt(jwt: string): Promise<{exp: number}> {
        try {
            const { exp } = await this.jwtService.verifyAsync(jwt)
            return {exp}
        } catch (error) {
            throw new HttpException('Invalid Jwt', HttpStatus.UNAUTHORIZED)
        }

    }


}
