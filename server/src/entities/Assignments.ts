import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmployeesProfiles } from "./EmployeesProfiles";

@Index("assignment_employee_id_fk_idx", ["employeeId"], {})
@Entity("assignments", { schema: "hackathon" })
export class Assignments {
  @PrimaryGeneratedColumn({ type: "int", name: "assignment_id" })
  assignmentId: number;

  @Column("varchar", { name: "employee_id", length: 36 })
  employeeId: string;

  @Column("varchar", { name: "workgroup", length: 128 })
  workgroup: string;

  @Column("varchar", { name: "cost_center", length: 128 })
  costCenter: string;

  @Column("varchar", { name: "sdm_reporting_manager", length: 256 })
  sdmReportingManager: string;

  @Column("int", { name: "allocation_percentage" })
  allocationPercentage: number;

  @Column("date", { name: "start_date" })
  startDate: string;

  @Column("date", { name: "release_date", nullable: true })
  releaseDate: string | null;

  @ManyToOne(
    () => EmployeesProfiles,
    (employeesProfiles) => employeesProfiles.assignments,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "employee_id", referencedColumnName: "id" }])
  employee: EmployeesProfiles;
}
