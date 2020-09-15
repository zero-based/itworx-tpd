import { Column, Entity, OneToMany } from "typeorm";
import { ResourceRequestActions } from "./ResourceRequestActions";
import { ResourceRequestSkills } from "./ResourceRequestSkills";

@Entity("resource_requests", { schema: "hackathon" })
export class ResourceRequests {
  @Column("int", { primary: true, name: "reference_number" })
  referenceNumber: number;

  @Column("varchar", { name: "manager_name", length: 256 })
  managerName: string;

  @Column("varchar", { name: "function", length: 128 })
  function: string;

  @Column("varchar", { name: "title", length: 128 })
  title: string;

  @Column("date", { name: "start_date" })
  startDate: string;

  @Column("date", { name: "end_date" })
  endDate: string;

  @Column("int", { name: "propability" })
  propability: number;

  @Column("int", { name: "percentage" })
  percentage: number;

  @Column("varchar", { name: "status", length: 32 })
  status: string;

  @Column("varchar", { name: "core_team_member", nullable: true, length: 1 })
  coreTeamMember: string | null;

  @Column("varchar", { name: "replacenement", nullable: true, length: 1 })
  replacenement: string | null;

  @Column("varchar", { name: "replacement_for", nullable: true, length: 256 })
  replacementFor: string | null;

  @Column("int", { name: "requests_count", nullable: true })
  requestsCount: number | null;

  @Column("varchar", {
    name: "related_opportunity",
    nullable: true,
    length: 128,
  })
  relatedOpportunity: string | null;

  @Column("varchar", { name: "comments", nullable: true, length: 256 })
  comments: string | null;

  @Column("varchar", { name: "assigned_resource", nullable: true, length: 256 })
  assignedResource: string | null;

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
