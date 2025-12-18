import { IsArray, IsInt, IsString } from 'class-validator';
// dto mtaa creation intervention jdida
export class CreateInterventionDto {
//houni l validation mtaa l description lezmou string
@IsString()
  description: string;

// l id mtaa l device lezmou integer
  @IsInt()
  deviceId: number;

// l ids mtaa l spare parts lezmou tableau of integers
  @IsArray()
  sparePartIds: number[];
}
