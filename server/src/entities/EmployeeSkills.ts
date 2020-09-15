import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Skills } from "./Skills";
import { EmployeesProfiles } from "./EmployeesProfiles";

@Index("Employee_ID_idx", ["employeeId"], {})
@Index("Skill_ID_idx", ["skillId"], {})
@Entity("employee_skills", { schema: "hackathon" })
export class EmployeeSkills {
  @Column("varchar", { primary: true, name: "employee_id", length: 36 })
  employeeId: string;

  @Column("int", { primary: true, name: "skill_id" })
  skillId: number;

  @Column("varchar", { name: "experience_level", length: 32 })
  experienceLevel: string;

  @Column("date", { name: "last_used_date" })
  lastUsedDate: string;

  @ManyToOne(() => Skills, (skills) => skills.employeeSkills, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "skill_id", referencedColumnName: "skillId" }])
  skill: Skills;

  @ManyToOne(
    () => EmployeesProfiles,
    (employeesProfiles) => employeesProfiles.employeeSkills,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "employee_id", referencedColumnName: "id" }])
  employee: EmployeesProfiles;
}
