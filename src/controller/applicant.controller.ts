import { Controller, Get, Inject ,Res} from '@nestjs/common';
import { ApplicantService } from '../service/applicant.service';
import { Applicant } from 'src/entity/applicant.entity';
import { Response } from 'express';
@Controller('/api/applicant')
export class ApplicantController {

  @Inject()
  private readonly applicantService: ApplicantService

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const applicants: Applicant[] = await this.applicantService.findAll();
    res.json(applicants);
  }


}