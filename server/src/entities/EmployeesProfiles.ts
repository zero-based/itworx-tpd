import {
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
import { Managers } from "./Managers";
import { ReleaseRequests } from "./ReleaseRequests";

@Index("manager_id_fk_idx", ["directManager"], {})
@Entity("employees_profiles", { schema: "hackathon" })
export class EmployeesProfiles {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 256 })
  name: string;

  @Column("varchar", { name: "title", length: 128 })
  title: string;

  @Column("date", { name: "hiring_date" })
  hiringDate: string;

  @Column("varchar", { name: "function", length: 128 })
  function: string;

  @Column("varchar", { name: "direct_manager", length: 36 })
  directManager: string;

  @Column("varchar", { name: "workgroup", length: 128 })
  workgroup: string;

  @Column("varchar", { name: "employment_type", length: 64 })
  employmentType: string;

  @Column("int", { name: "allocation_percentage" })
  allocationPercentage: number;

  @Column("date", { name: "skills_last_update_date", nullable: true })
  skillsLastUpdateDate: string | null;

  @Column("varchar", { name: "employee_email", length: 320 })
  employeeEmail: string;

  @Column("varchar", {
    name: "employee_profile_picture",
    nullable: true,
    length: 45,
  })
  employeeProfilePicture: string | null;

  @Column("varchar", { name: "mobile_number", length: 20 })
  mobileNumber: string;

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

  @ManyToOne(() => Managers, (managers) => managers.employeesProfiles, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "direct_manager", referencedColumnName: "id" }])
  directManager2: Managers;

  @OneToMany(
    () => ReleaseRequests,
    (releaseRequests) => releaseRequests.employee
  )
  releaseRequests: ReleaseRequests[];
}
