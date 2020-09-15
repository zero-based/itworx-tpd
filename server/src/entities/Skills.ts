import { Column, Entity, Index, OneToMany } from "typeorm";
import { EmployeeSkills } from "./EmployeeSkills";
import { EmployeeSkillsHistory } from "./EmployeeSkillsHistory";
import { ResourceRequestSkills } from "./ResourceRequestSkills";

@Index("Skill_Name_UNIQUE", ["skillName"], { unique: true })
@Index("IDX_6c500b27556245e209296e8a3f", ["skillName"], { unique: true })
@Entity("skills", { schema: "hackathon" })
export class Skills {
  @Column("int", { primary: true, name: "skill_id" })
  skillId: number;

  @Column("varchar", { name: "skill_name", unique: true, length: 45 })
  skillName: string;

  @OneToMany(() => EmployeeSkills, (employeeSkills) => employeeSkills.skill)
  employeeSkills: EmployeeSkills[];

  @OneToMany(
    () => EmployeeSkillsHistory,
    (employeeSkillsHistory) => employeeSkillsHistory.skill
  )
  employeeSkillsHistories: EmployeeSkillsHistory[];

  @OneToMany(
    () => ResourceRequestSkills,
    (resourceRequestSkills) => resourceRequestSkills.skill
  )
  resourceRequestSkills: ResourceRequestSkills[];
}
