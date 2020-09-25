import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Certifications } from "./Certifications";

@ObjectType()
@Entity("certification_providers", { schema: "hackathon" })
export class CertificationProviders extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn({ type: "int", name: "certificatoin_provider_id" })
  certificatoinProviderId: number;

  @Field()
  @Column("varchar", { name: "certification_provider_name", length: 128 })
  certificationProviderName: string;

  @OneToMany(
    () => Certifications,
    (certifications) => certifications.certificationProvider
  )
  certifications: Certifications[];
}
