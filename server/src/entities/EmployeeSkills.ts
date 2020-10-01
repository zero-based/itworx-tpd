import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { EmployeesProfiles } from "./EmployeesProfiles";
import { Skills } from "./Skills";

@ObjectType()
@Index("employee_skill_skill_id_fk", ["skillId"], {})
@Entity("employee_skills", { schema: "hackathon" })
export class EmployeeSkills extends BaseEntity {
  @Field()
  @Column("varchar", { primary: true, name: "employee_id", length: 36 })
  employeeId: string;

  @Field()
  @Column("int", { primary: true, name: "skill_id" })
  skillId: number;

  @Field()
  @Column("varchar", { name: "experience_level", length: 32 })
  experienceLevel: string;

  @Field()
  @Column("date", { name: "last_used_date" })
  lastUsedDate: string;

  @ManyToOne(
    () => EmployeesProfiles,
    (employeesProfiles) => employeesProfiles.employeeSkills,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "employee_id", referencedColumnName: "id" }])
  employee: EmployeesProfiles;

  @Field()
  @ManyToOne(() => Skills, (skills) => skills.employeeSkills, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    eager: true,
  })
  @JoinColumn([{ name: "skill_id", referencedColumnName: "skillId" }])
  skill: Skills;
}
