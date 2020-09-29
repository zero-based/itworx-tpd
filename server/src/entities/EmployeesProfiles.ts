import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Assignment } from "./Assignment";
import { EmployeeCertifications } from "./EmployeeCertifications";
import { EmployeeSkills } from "./EmployeeSkills";
import { EmployeeSkillsHistory } from "./EmployeeSkillsHistory";
import { EmployeeTraining } from "./EmployeeTraining";
import { ReleaseRequests } from "./ReleaseRequests";

@ObjectType()
@Index("manager_id_fk_idx", ["directManagerId"], {})
@Entity("employees_profiles", { schema: "hackathon" })
export class EmployeesProfiles extends BaseEntity {
  @Field()
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Field()
  @Column("varchar", { name: "name", length: 256 })
  name: string;

  @Field()
  @Column("varchar", { name: "title", length: 128 })
  title: string;

  @Field()
  @Column("date", { name: "hiring_date" })
  hiringDate: string;

  @Field()
  @Column("varchar", { name: "function", length: 128 })
  function: string;

  @Field(() => String, { nullable: true })
  @Column("varchar", { name: "direct_manager_id", nullable: true, length: 36 })
  directManagerId: string | null;

  @Field()
  @Column("varchar", { name: "workgroup", length: 128 })
  workgroup: string;

  @Field()
  @Column("varchar", { name: "employment_type", length: 64 })
  employmentType: string;

  @Field()
  @Column("int", { name: "allocation_percentage" })
  allocationPercentage: number;

  @Field(() => String, { nullable: true })
  @Column("date", { name: "skills_last_update_date", nullable: true })
  skillsLastUpdateDate: string | null;

  @Field()
  @Column("varchar", { name: "employee_email", length: 320 })
  employeeEmail: string;

  @Field(() => String, { nullable: true })
  @Column("varchar", {
    name: "employee_profile_picture",
    nullable: true,
    length: 45,
  })
  employeeProfilePicture: string | null;

  @Field()
  @Column("varchar", { name: "mobile_number", length: 20 })
  mobileNumber: string;

  @Field()
  @Column("varchar", { name: "cost_center", length: 128 })
  costCenter: string;

  @OneToMany(() => Assignment, (assignment) => assignment.employee)
  assignments: Assignment[];

  @OneToMany(
    () => EmployeeCertifications,
    (employeeCertifications) => employeeCertifications.employee
  )
  employeeCertifications: EmployeeCertifications[];

  @OneToMany(() => EmployeeSkills, (employeeSkills) => employeeSkills.employee)
  employeeSkills: EmployeeSkills[];

  @OneToMany(
    () => EmployeeSkillsHistory,
    (employeeSkillsHistory) => employeeSkillsHistory.employee
  )
  employeeSkillsHistories: EmployeeSkillsHistory[];

  @OneToMany(
    () => EmployeeTraining,
    (employeeTraining) => employeeTraining.employee
  )
  employeeTrainings: EmployeeTraining[];

  @Field(() => EmployeesProfiles, { nullable: true })
  @ManyToOne(
    () => EmployeesProfiles,
    (employeesProfiles) => employeesProfiles.employeesProfiles,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "direct_manager_id", referencedColumnName: "id" }])
  directManager: EmployeesProfiles;

  @OneToMany(
    () => EmployeesProfiles,
    (employeesProfiles) => employeesProfiles.directManager
  )
  employeesProfiles: EmployeesProfiles[];

  @OneToMany(
    () => ReleaseRequests,
    (releaseRequests) => releaseRequests.employee
  )
  releaseRequests: ReleaseRequests[];
}
