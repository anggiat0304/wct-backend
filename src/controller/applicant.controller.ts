import { Controller, Get, Inject ,Res,HttpStatus, Param} from '@nestjs/common';
import { ApplicantService } from '../service/applicant.service';
import { Applicant } from 'src/entity/applicant.entity';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
@Controller('/api/applicant')
export class ApplicantController {

  @Inject()
  private readonly applicantService: ApplicantService

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const filePath = path.join(__dirname, '../../src/folder/mock/data.json');


    // Membaca file JSON dari sistem file
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    res.json(JSON.parse(jsonData));

  }
  @Get('/file/:filename')
  async downloadFile(@Param('filename') namaFile: string, @Res() res: Response) {
    const filePath = path.resolve(__dirname, '..', '../src/folder/file', namaFile);
   

    // Cek apakah file ada
    if (!fs.existsSync(filePath)) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'File not found' });
    }

    // Stream file sebagai response
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${namaFile}`);
    fs.createReadStream(filePath).pipe(res);
  }

}