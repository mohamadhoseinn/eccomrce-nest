import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import userRoleEnum from '../enums/userRoleEnum';

export class UpdateUserDto {
  @IsString({ message: 'نام باید یک رشته باشد' })
  @IsNotEmpty({ message: 'نام نمیتواند خالی باشد' })
  display_name: string;

  @IsOptional()
  role: userRoleEnum;
}
