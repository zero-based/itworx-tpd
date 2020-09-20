import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ResourceRequestActions } from "./ResourceRequestActions";
import { ResourceRequestSkills } from "./ResourceRequestSkills";

@ObjectType()
@Entity("resource_requests", { schema: "hackathon" })
export class ResourceRequests extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn({ type: "int", name: "reference_number" })
  referenceNumber: number;

  @Field()
  @Column("varchar", { name: "manager_name", length: 256 })
  managerName: string;

  @Field()
  @Column("varchar", { name: "function", length: 128 })
  function: string;

  @Field()
  @Column("varchar", { name: "title", length: 128 })
  title: string;

  @Field()
  @Column("date", { name: "start_date" })
  startDate: string;

  @Field()
  @Column("date", { name: "end_date" })
  endDate: string;

  @Field()
  @Column("int", { name: "propability" })
  propability: number;

  @Field()
  @Column("int", { name: "percentage" })
  percentage: number;

  @Field()
  @Column("varchar", { name: "status", length: 32 })
  status: string;

  @Field(() => String, { nullable: true })
  @Column("varchar", { name: "core_team_member", nullable: true, length: 1 })
  coreTeamMember: string | null;

  @Field(() => String, { nullable: true })
  @Column("varchar", { name: "replacenement", nullable: true, length: 1 })
  replacenement: string | null;

  @Field(() => String, { nullable: true })
  @Column("varchar", { name: "replacement_for", nullable: true, length: 256 })
  replacementFor: string | null;

  @Field(() => Int, { nullable: true })
  @Column("int", { name: "requests_count", nullable: true })
  requestsCount: number | null;

  @Field(() => String, { nullable: true })
  @Column("varchar", {
    name: "related_opportunity",
    nullable: true,
    length: 128,
  })
  relatedOpportunity: string | null;

  @Field(() => String, { nullable: true })
  @Column("varchar", { name: "comments", nullable: true, length: 256 })
  comments: string | null;

  @Field(() => String, { nullable: true })
  @Column("varchar", { name: "assigned_resource", nullable: true, length: 256 })
  assignedResource: string | null;

  @Field(() => Int, { nullable: true })
  @Column("int", { name: "actual_percentage", nullable: true })
  actualPercentage: number | null;

  @OneToMany(
    () => ResourceRequestActions,
    (resourceRequestActions) =>
      resourceRequestActions.resourceRequestReferenceNumber2
  )
  resourceRequestActions: ResourceRequestActions[];

  @OneToMany(
    () => ResourceRequestSkills,
    (resourceRequestSkills) => resourceRequestSkills.requestReferenceNumber2
  )
  resourceRequestSkills: ResourceRequestSkills[];
}
