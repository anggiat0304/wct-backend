import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicantService } from './service/applicant.service';
import { ApplicantController } from './controller/applicant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applicant } from './entity/applicant.entity';
import { FilesController } from './controller/files.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // ganti dengan jenis database yang sesuai
      host: '127.0.0.1', // ganti dengan host database Anda
      port: 3306, // ganti dengan port database Anda
      username: 'root', // ganti dengan username database Anda
      password: 'root', // ganti dengan password database Anda
      database: 'WCT', // ganti dengan nama database Anda
      autoLoadEntities: true, // Otomatis memuat entitas dari folder src
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // Catatan: Jangan aktifkan di lingkungan produksi
    }),
    TypeOrmModule.forFeature([Applicant])
  ],
  controllers: [AppController, ApplicantController,FilesController],
  providers: [AppService, ApplicantService],
}
)
export class AppModule {}
