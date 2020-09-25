import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { CertificationProviders } from "./CertificationProviders";
import { Certifications } from "./Certifications";
import { EmployeesProfiles } from "./EmployeesProfiles";

@ObjectType()
@Index("employee_certification_employee_id_fk_idx", ["employeeId"], {})
@Index(
  "employee_certification_certification_id_fk_idx",
  ["certificationId"],
  {}
)
@Entity("employee_certifications", { schema: "hackathon" })
export class EmployeeCertifications extends BaseEntity {
  @Field()
  @Column("varchar", { primary: true, name: "employee_id", length: 36 })
  employeeId: string;

  @Field()
  @Column("int", { primary: true, name: "certification_id" })
  certificationId: number;

  @Field(() => String, { nullable: true })
  @Column("date", { name: "expiration_date", nullable: true })
  expirationDate: string | null;

  @Field()
  @ManyToOne(
    () => Certifications,
    (certifications) => certifications.employeeCertifications,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION", eager: true }
  )
  @JoinColumn([
    { name: "certification_id", referencedColumnName: "certificationId" },
  ])
  certification: Certifications;

  @ManyToOne(
    () => EmployeesProfiles,
    (employeesProfiles) => employeesProfiles.employeeCertifications,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "employee_id", referencedColumnName: "id" }])
  employee: EmployeesProfiles;
}
