import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("surveys_users")
class SurveyUser {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  value: number;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "survey_id" })
  surveyId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default SurveyUser;
