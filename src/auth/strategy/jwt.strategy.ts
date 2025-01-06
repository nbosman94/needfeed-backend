import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import {Strategy, ExtractJwt} from "passport-jwt"


export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret',
        });

    }

    async validate(payload: any){
        return {...payload.user}
    
    }
}
