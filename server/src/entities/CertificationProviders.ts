import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Certifications } from "./Certifications";

@Entity("certification_providers", { schema: "hackathon" })
export class CertificationProviders {
  @PrimaryGeneratedColumn({ type: "int", name: "certificatoin_provider_id" })
  certificatoinProviderId: number;

  @Column("varchar", { name: "certification_provider_name", length: 128 })
  certificationProviderName: string;

  @OneToMany(
    () => Certifications,
    (certifications) => certifications.certificationProvider
  )
  certifications: Certifications[];
}
