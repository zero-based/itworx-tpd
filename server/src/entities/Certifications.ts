import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
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

@ObjectType()
@Index(
  "certification_certifications_provider_id_fk_idx",
  ["certificationProviderId"],
  {}
)
@Entity("certifications", { schema: "hackathon" })
export class Certifications extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn({ type: "int", name: "certification_id" })
  certificationId: number;

  @Field()
  @Column("int", { name: "certification_provider_id" })
  certificationProviderId: number;

  @Field()
  @Column("varchar", { name: "certification_name", length: 128 })
  certificationName: string;

  @Field(() => CertificationProviders)
  @ManyToOne(
    () => CertificationProviders,
    (certificationProviders) => certificationProviders.certifications,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION", eager: true }
  )
  @JoinColumn([
    {
      name: "certification_provider_id",
      referencedColumnName: "certificationProviderId",
    },
  ])
  certificationProvider: CertificationProviders;

  @Field(() => [EmployeeCertifications], { nullable: true })
  @OneToMany(
    () => EmployeeCertifications,
    (employeeCertifications) => employeeCertifications.certification
  )
  employeeCertifications: EmployeeCertifications[];
}
