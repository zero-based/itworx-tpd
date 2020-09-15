import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { ResourceRequests } from "./ResourceRequests";
import { Skills } from "./Skills";

@Index("skill_id_fk_idx", ["skillId"], {})
@Index(
  "resource_request_skills_reference_number_fk_idx",
  ["requestReferenceNumber"],
  {}
)
@Entity("resource_request_skills", { schema: "hackathon" })
export class ResourceRequestSkills {
  @Column("int", { primary: true, name: "skill_id" })
  skillId: number;

  @Column("int", { primary: true, name: "request_reference_number" })
  requestReferenceNumber: number;

  @Column("varchar", { name: "category", length: 64 })
  category: string;

  @Column("varchar", { name: "subcategory", nullable: true, length: 64 })
  subcategory: string | null;

  @ManyToOne(
    () => ResourceRequests,
    (resourceRequests) => resourceRequests.resourceRequestSkills,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    {
      name: "request_reference_number",
      referencedColumnName: "referenceNumber",
    },
  ])
  requestReferenceNumber2: ResourceRequests;

  @ManyToOne(() => Skills, (skills) => skills.resourceRequestSkills, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "skill_id", referencedColumnName: "skillId" }])
  skill: Skills;
}
