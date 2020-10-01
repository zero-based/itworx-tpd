import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ReleaseRequests } from "./ReleaseRequests";

@Entity("release_requests_actions", { schema: "hackathon" })
export class ReleaseRequestsActions {
  @PrimaryGeneratedColumn({ type: "int", name: "action_id" })
  actionId: number;

  @Column("int", { name: "release_request_reference_number" })
  releaseRequestReferenceNumber: number;

  @Column("varchar", { name: "action", length: 32 })
  action: string;

  @Column("varchar", { name: "action_note", nullable: true, length: 64 })
  actionNote: string | null;

  @OneToOne(
    () => ReleaseRequests,
    (releaseRequests) => releaseRequests.releaseRequestsActions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "action_id", referencedColumnName: "referenceNumber" }])
  action2: ReleaseRequests;
}
