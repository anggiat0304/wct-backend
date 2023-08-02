import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Applicant } from 'src/entity/applicant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApplicantService {

    @InjectRepository(Applicant)
    private readonly applicantRepository: Repository<Applicant>




  async findAll(): Promise<Applicant[]> {
    return this.applicantRepository.find();
  }


}
  