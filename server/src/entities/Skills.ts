import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmployeeSkills } from "./EmployeeSkills";
import { EmployeeSkillsHistory } from "./EmployeeSkillsHistory";
import { ResourceRequestSkills } from "./ResourceRequestSkills";

@ObjectType()
@Index("Skill_Name_UNIQUE", ["skillName"], { unique: true })
@Entity("skills", { schema: "hackathon" })
export class Skills extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn({ type: "int", name: "skill_id" })
  skillId: number;

  @Field()
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
