import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserResponseDto } from 'src/users/dto/reponse-user.dto';
import { ExistingUserDto } from 'src/users/dto/existing-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    register(@Body() user: CreateUserDto): Promise<UserResponseDto| null >{
        return this.authService.register(user);
    }

    @Post('login')
    // @UseGuards(LocalGuard)
    @HttpCode(HttpStatus.OK)
    login(@Body() user: ExistingUserDto): Promise<{token: string}>{
        return this.authService.login(user);
    }

    @Post('verify-jwt')
    verifyJwt(@Body() payload: {jwt: string}): Promise<{exp: number} | null>{
        return this.authService.verifyJwt(payload.jwt);
    }

}
