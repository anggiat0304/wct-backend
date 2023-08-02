// applicant.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Applicant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameApplicant: string;

  @Column()
  code: string;

  @Column()
  type: string;

  @Column()
  status: string;

  @Column()
  resolution: string;

  @Column()
  securityLevel: string;

  // Tambahkan kolom lain sesuai kebutuhan Anda
}
