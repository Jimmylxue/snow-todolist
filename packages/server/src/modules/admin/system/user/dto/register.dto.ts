import {
  IsIn,
  IsMobilePhone,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
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

export class UpdateDto {
  @IsOptional()
  @IsMobilePhone('zh-CN')
  @IsNotEmpty({ message: 'phone不能为空' })
  phone: string;

  // @IsNumberString({ message: '类型错误' })
  @IsOptional()
  @IsString({ message: '类型错误-必须是字符串类型' })
  @IsIn(['0', '1'], {
    // message: '0 男 1 女',
  })
  sex: string;

  @IsOptional()
  @IsString({ message: '类型错误' })
  avatar: string;

  @IsOptional()
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '类型错误' })
  username: string;
}
