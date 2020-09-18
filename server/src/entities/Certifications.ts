import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CertificationProviders } from "./CertificationProviders";
import { EmployeeCertifications } from "./EmployeeCertifications";

@Index("certifications_provider_id_fk_idx", ["certificationProviderId"], {})
@Entity("certifications", { schema: "hackathon" })
export class Certifications {
  @PrimaryGeneratedColumn({ type: "int", name: "certification_id" })
  certificationId: number;

  @Column("int", { name: "certification_provider_id" })
  certificationProviderId: number;

  @Column("varchar", { name: "certification_name", length: 128 })
  certificationName: string;

  @ManyToOne(
    () => CertificationProviders,
    (certificationProviders) => certificationProviders.certifications,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    {
      name: "certification_provider_id",
      referencedColumnName: "certificatoinProviderId",
    },
  ])
  certificationProvider: CertificationProviders;

  @OneToMany(
    () => EmployeeCertifications,
    (employeeCertifications) => employeeCertifications.certification
  )
  employeeCertifications: EmployeeCertifications[];
}
