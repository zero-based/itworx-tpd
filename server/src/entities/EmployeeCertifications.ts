import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Certifications } from "./Certifications";
import { EmployeesProfiles } from "./EmployeesProfiles";

@Index("employee_certification_employee_id_fk_idx", ["employeeId"], {})
@Index(
  "employee_certification_certification_id_fk_idx",
  ["certificationId"],
  {}
)
@Entity("employee_certifications", { schema: "hackathon" })
export class EmployeeCertifications {
  @Column("varchar", { primary: true, name: "employee_id", length: 36 })
  employeeId: string;

  @Column("int", { primary: true, name: "certification_id" })
  certificationId: number;

  @Column("date", { name: "expiration_date", nullable: true })
  expirationDate: string | null;

  @ManyToOne(
    () => Certifications,
    (certifications) => certifications.employeeCertifications,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
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
