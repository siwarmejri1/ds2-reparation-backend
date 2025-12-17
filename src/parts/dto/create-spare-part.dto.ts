import {  IsString, IsNumber, IsPositive,  IsOptional, Min, MaxLength  } from 'class-validator';
// dto besh na3rfou chnowa l data l lazmna bsh ncreateiw spare part jdida
export class CreateSparePartDto {
//houni 3mlna validation l kol property mtaa l dto
// name lazm ykoun string w 100 characters max
 @IsString()
 @MaxLength(100)
  name: string;
// stock lazm ykoun number positif wela zero
  @IsNumber()
 @IsPositive()
  @Min(0)
  stock: number;
// price lazm ykoun number positif wela zero
  @IsNumber()
  @Min(0)
  @IsPositive()
  price: number;
}