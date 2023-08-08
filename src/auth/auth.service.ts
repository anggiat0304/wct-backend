import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/dto/login.user.dto';
@Injectable()
export class AuthService {
    private  users = [
        { id: 1, nama:"Admin" ,username: 'admin', password: bcrypt.hashSync('admin', 10) }, // Contoh password: "admin"
      ];
    
      @Inject()
      private jwtService : JwtService;

      async validateUser(username: string, password:string):Promise<any>{
        const user = this.users.find((user)=>user.username===username);

        if (!user) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        
        if(isPasswordValid){
            const {password , ...result} = user;
            console.log(result)
            return result;
        }

        return null;
      }

      async login(user: any){
        const payload = {sub :user.id, username: user.username};
        const access_token = this.jwtService.sign(payload);
        return{
            access_token,
            user
        }
      }
     
}
