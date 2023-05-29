import {
  IsMobilePhone,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

export class RegisterDto {
  @IsMobilePhone('zh-CN')
  @IsNotEmpty({ message: 'phone不能为空' })
  phone: string;

  // @IsNumberString({ message: '类型错误' })
  sex: string;

  // @IsString({ message: '类型错误' })
  avatar: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '类型错误' })
  password: string;

  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '类型错误' })
  username: string;
}
