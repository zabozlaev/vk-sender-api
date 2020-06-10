import { Document, Schema, Mongoose } from 'mongoose';
import { TargetStatusEnum } from '../enums/target-status.enum';

export interface Target extends Document {
  group_id: string;
  gr_name: string;
  date: Date;
  action: string;
  stud_name: string;
  st_vk_id: number;
  comment: string;
  sale_id: number;
  discip_name: string;
  stud_id: number;
  sale_type_id: number;
  amount: number;
  state: TargetStatusEnum;
}

export const targetSchema = new Schema(
  {
    group_id: {
      type: String,
    },
    gr_name: {
      type: String,
    },
    date: {
      type: String,
    },
    action: {
      type: String,
    },
    stud_name: {
      type: String,
    },
    st_vk_id: {
      type: Number,
      unique: true,
    },
    comment: {
      type: String,
    },
    sale_id: {
      type: Number,
    },
    discip_name: {
      type: String,
    },
    stud_id: {
      type: Number,
    },
    sale_type_id: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    state: {
      type: String,
      enum: [
        TargetStatusEnum.SENT,
        TargetStatusEnum.PENDING,
        TargetStatusEnum.BLOCKED,
      ],
    },
  },
  { timestamps: true },
);

export const targetModel = (db: Mongoose) =>
  db.model<Target>('targets', targetSchema);
