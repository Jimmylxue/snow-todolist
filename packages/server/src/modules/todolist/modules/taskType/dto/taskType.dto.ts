import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserTaskBody {
  @IsNotEmpty({ message: 'typeId不能为空' })
  @IsInt({ message: 'typeId-参数类型错误' })
  typeId: number;

  @IsNotEmpty({ message: 'userId不能为空' })
  @IsInt({ message: 'userId-参数类型错误' })
  userId: number;
}

export class AddUserTypeParams {
  @IsNotEmpty({ message: 'typeName不能为空' })
  @IsString({ message: 'typeName-参数类型错误' })
  typeName: string;

  @IsNotEmpty({ message: 'desc不能为空' })
  @IsString({ message: 'desc-参数类型错误' })
  desc: string;

  @IsOptional()
  @IsString({ message: 'themeColor-参数类型错误' })
  themeColor: string;
}

export class DelTypeParams {
  @IsNotEmpty({ message: 'typeId不能为空' })
  @IsInt({ message: 'typeId-参数类型错误' })
  typeId: number;
}

export class DetailTypeParams {
  @IsNotEmpty({ message: 'typeId不能为空' })
  @IsInt({ message: 'typeId-参数类型错误' })
  typeId: number;
}

export class UpdateTypeParams {
  @IsNotEmpty({ message: 'typeId不能为空' })
  @IsInt({ message: 'typeId-参数类型错误' })
  typeId: number;

  @IsNotEmpty({ message: 'typeName不能为空' })
  @IsString({ message: 'typeName-参数类型错误' })
  typeName: string;

  @IsNotEmpty({ message: 'desc不能为空' })
  @IsString({ message: 'desc-参数类型错误' })
  desc: string;

  @IsOptional()
  @IsString({ message: 'themeColor-参数类型错误' })
  themeColor: string;
}
