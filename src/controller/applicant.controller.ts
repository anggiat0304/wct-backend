import { Controller, Get, Inject ,Res,HttpStatus, Param} from '@nestjs/common';
import { Applicant } from 'src/entity/applicant.entity';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
@Controller('/api/applicant')
export class ApplicantController {

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const filePath = path.join(__dirname, '../../src/folder/mock/data.json');


    // Membaca file JSON dari sistem file
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    res.json(JSON.parse(jsonData));

  }
}