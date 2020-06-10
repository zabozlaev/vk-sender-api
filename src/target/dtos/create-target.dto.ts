import { TargetStatusEnum } from '../enums/target-status.enum';

export class CreateTargetDto {
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

  state: TargetStatusEnum.PENDING = TargetStatusEnum.PENDING;
}
