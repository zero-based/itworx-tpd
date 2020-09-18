import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmployeesProfiles } from "./EmployeesProfiles";
import { ReleaseRequestsActions } from "./ReleaseRequestsActions";

@Index("release_request_employee_id_fk_idx", ["employeeId"], {})
@Entity("release_requests", { schema: "hackathon" })
export class ReleaseRequests {
  @PrimaryGeneratedColumn({ type: "int", name: "reference_number" })
  referenceNumber: number;

  @Column("varchar", { name: "manager_name", length: 256 })
  managerName: string;

  @Column("varchar", { name: "employee_name", length: 256 })
  employeeName: string;

  @Column("varchar", { name: "employee_id", length: 36 })
  employeeId: string;

  @Column("varchar", { name: "employee_title", length: 128 })
  employeeTitle: string;

  @Column("varchar", { name: "function", length: 128 })
  function: string;

  @Column("date", { name: "release_date" })
  releaseDate: string;

  @Column("int", { name: "propability" })
  propability: number;

  @Column("int", { name: "release_percentage" })
  releasePercentage: number;

  @Column("varchar", { name: "release_reason", length: 256 })
  releaseReason: string;

  @Column("varchar", { name: "leaving", length: 1 })
  leaving: string;

  @Column("varchar", { name: "request_status", length: 32 })
  requestStatus: string;

  @ManyToOne(
    () => EmployeesProfiles,
    (employeesProfiles) => employeesProfiles.releaseRequests,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "employee_id", referencedColumnName: "id" }])
  employee: EmployeesProfiles;

  @OneToOne(
    () => ReleaseRequestsActions,
    (releaseRequestsActions) => releaseRequestsActions.action2
  )
  releaseRequestsActions: ReleaseRequestsActions;
}
