import { IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsMobilePhone('zh-CN')
  phone: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '类型错误' })
  password: string;
}
