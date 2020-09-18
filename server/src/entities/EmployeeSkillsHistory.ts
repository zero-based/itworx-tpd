import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Skills } from "./Skills";
import { EmployeesProfiles } from "./EmployeesProfiles";

@Index("employee_skill_history_employee_id_fk_idx", ["employeeId"], {})
@Index("employee_skills_history_skill_id_fk_idx", ["skillId"], {})
@Entity("employee_skills_history", { schema: "hackathon" })
export class EmployeeSkillsHistory {
  @Column("varchar", { primary: true, name: "employee_id", length: 36 })
  employeeId: string;

  @Column("int", { primary: true, name: "skill_id" })
  skillId: number;

  @Column("varchar", { name: "experience_level", length: 32 })
  experienceLevel: string;

  @Column("date", { name: "last_used_date" })
  lastUsedDate: string;

  @Column("date", { name: "created_on" })
  createdOn: string;

  @Column("varchar", { name: "manager_name", length: 256 })
  managerName: string;

  @Column("varchar", { name: "title", length: 128 })
  title: string;

  @Column("varchar", { name: "function", length: 128 })
  function: string;

  @ManyToOne(() => Skills, (skills) => skills.employeeSkillsHistories, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "skill_id", referencedColumnName: "skillId" }])
  skill: Skills;

  @ManyToOne(
    () => EmployeesProfiles,
    (employeesProfiles) => employeesProfiles.employeeSkillsHistories,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "employee_id", referencedColumnName: "id" }])
  employee: EmployeesProfiles;
}
