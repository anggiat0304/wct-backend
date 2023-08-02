import { Controller, Get, Inject } from '@nestjs/common';
import { ApplicantService } from '../service/applicant.service';
import { Applicant } from 'src/entity/applicant.entity';
@Controller('/api/applicant')
export class ApplicantController {

  @Inject()
  private readonly applicantService: ApplicantService

  @Get()
  async findAll(): Promise<Applicant[]> {
    return this.applicantService.findAll();
  }


}