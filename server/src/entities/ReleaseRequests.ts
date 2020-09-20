import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
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

@ObjectType()
@Index("release_request_employee_id_fk_idx", ["employeeId"], {})
@Entity("release_requests", { schema: "hackathon" })
export class ReleaseRequests extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn({ type: "int", name: "reference_number" })
  referenceNumber: number;

  @Field()
  @Column("varchar", { name: "manager_name", length: 256 })
  managerName: string;

  @Field()
  @Column("varchar", { name: "employee_name", length: 256 })
  employeeName: string;

  @Field()
  @Column("varchar", { name: "employee_id", length: 36 })
  employeeId: string;

  @Field()
  @Column("varchar", { name: "employee_title", length: 128 })
  employeeTitle: string;

  @Field()
  @Column("varchar", { name: "function", length: 128 })
  function: string;

  @Field()
  @Column("date", { name: "release_date" })
  releaseDate: string;

  @Field()
  @Column("int", { name: "propability" })
  propability: number;

  @Field()
  @Column("int", { name: "release_percentage" })
  releasePercentage: number;

  @Field()
  @Column("varchar", { name: "release_reason", length: 256 })
  releaseReason: string;

  @Field()
  @Column("varchar", { name: "leaving", length: 1 })
  leaving: string;

  @Field()
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
