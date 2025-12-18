import { PartialType } from '@nestjs/mapped-types';
import { CreateSparePartDto } from './create-spare-part.dto';
// dto besh na3rfou chnowa l data l lazmna bsh nupdateiw spare part
// naamlou extends l CreateSparePartDto besh nist3mlou nafs l properties w validation
export class UpdateSparePartDto extends PartialType(CreateSparePartDto) {}