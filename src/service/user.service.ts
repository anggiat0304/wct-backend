import { Injectable } from '@nestjs/common';
import { LoginUserDto } from 'src/dto/login.user.dto';

@Injectable()
export class UserService {
    async login(loginUserDto:LoginUserDto){

    }
}