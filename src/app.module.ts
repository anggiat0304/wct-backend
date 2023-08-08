import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicantController } from './controller/applicant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applicant } from './entity/applicant.entity';
import { FilesController } from './controller/files.controller';
import { UserController } from './controller/user.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey', // Ganti dengan kunci rahasia yang lebih kuat
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, ApplicantController,FilesController,UserController],
  providers: [AppService, AuthService],
}
)
export class AppModule {}
