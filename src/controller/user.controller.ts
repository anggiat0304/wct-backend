import { Controller, Get, Res,Param, HttpStatus, Query,Post , Body, Inject } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from 'src/dto/login.user.dto';

@Controller('/api/user')
export class UserController {

    @Inject()
    private authService : AuthService;

    @Post('/login')
    async login(@Body() body: LoginUserDto){
        const user = await this.authService.validateUser(body.username, body.password);
        
        if(!user){
            return {message:"Invalid Credentials"}
        }

        return this.authService.login(user);
    }
}