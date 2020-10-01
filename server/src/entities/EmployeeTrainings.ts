import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { EmployeesProfiles } from "./EmployeesProfiles";

@Entity("employee_trainings", { schema: "hackathon" })
export class EmployeeTrainings {
  @Column("varchar", { primary: true, name: "employee_id", length: 36 })
  employeeId: string;

  @Column("varchar", {
    primary: true,
    name: "training_activity_name",
    length: 256,
  })
  trainingActivityName: string;

  @Column("varchar", { name: "training_event_name", length: 256 })
  trainingEventName: string;

  @Column("date", { name: "event_from_date" })
  eventFromDate: string;

  @Column("date", { name: "event_to_date" })
  eventToDate: string;

  @Column("int", { name: "total_training_hours" })
  totalTrainingHours: number;

  @ManyToOne(
    () => EmployeesProfiles,
    (employeesProfiles) => employeesProfiles.employeeTrainings,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "employee_id", referencedColumnName: "id" }])
  employee: EmployeesProfiles;
}
