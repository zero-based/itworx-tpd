import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { ResourceRequests } from "./ResourceRequests";

@Index(
  "resource_request_reference_number_fk_idx",
  ["resourceRequestReferenceNumber"],
  {}
)
@Entity("resource_request_actions", { schema: "hackathon" })
export class ResourceRequestActions {
  @Column("int", { primary: true, name: "action_id" })
  actionId: number;

  @Column("int", { name: "resource_request_reference_number" })
  resourceRequestReferenceNumber: number;

  @Column("varchar", { name: "action", length: 32 })
  action: string;

  @Column("varchar", { name: "action_note", nullable: true, length: 256 })
  actionNote: string | null;

  @ManyToOne(
    () => ResourceRequests,
    (resourceRequests) => resourceRequests.resourceRequestActions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    {
      name: "resource_request_reference_number",
      referencedColumnName: "referenceNumber",
    },
  ])
  resourceRequestReferenceNumber2: ResourceRequests;
}
