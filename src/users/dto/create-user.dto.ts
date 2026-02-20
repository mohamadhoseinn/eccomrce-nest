import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import userRoleEnum from '../enums/userRoleEnum';

export class CreateUserDto {
  @IsString({ message: 'شماره موبایل باید یک رشته باشد' })
  @Length(11, 11, { message: 'شماره موبایل باید 11 رقم باشد' })
  @IsNotEmpty({ message: 'شماره موبایل نمیتواند خالی باشد' })
  //   @Matches('/^.{11}$/', { message: 'شماره موبایل باید 11 رقم باشد' })
  @Transform(({ value }: { value: string }) => value.trim())
  mobile: string;

  @IsString({ message: 'نام باید یک رشته باشد' })
  @IsNotEmpty({ message: 'نام نمیتواند خالی باشد' })
  display_name: string;

  @IsString({ message: 'رمزعبور باید یک رشته باشد' })
  @IsOptional()
  @MinLength(8, { message: 'رمزعبور باید حداقل 8 کاراکتر باشد' })
  password: string;

  @IsEnum(userRoleEnum, {
    message: 'نقش کاربر باید یکی از مقادیر (admin,user) باشد',
  })
  @IsOptional()
  role: userRoleEnum;
}
