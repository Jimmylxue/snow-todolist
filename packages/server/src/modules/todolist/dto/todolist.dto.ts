import {
  IsBooleanString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class UserTaskBody {
  @IsNotEmpty({ message: 'typeId不能为空' })
  @IsString({ message: 'typeId-参数类型错误' })
  typeId: string;

  @IsNotEmpty({ message: 'userId不能为空' })
  @IsString({ message: 'userId-参数类型错误' })
  userId: string;
}

export class UserTypeQuery {
  @IsNotEmpty({ message: 'userId不能为空' })
  @IsString({ message: 'userId-参数类型错误' })
  userId: string;
}

export class AddUserTypeParams {
  @IsNotEmpty({ message: 'userId不能为空' })
  @IsNumberString({ message: 'userId-参数类型错误' })
  userId: number;

  @IsNotEmpty({ message: 'typeName不能为空' })
  @IsString({ message: 'typeName-参数类型错误' })
  typeName: string;
}
