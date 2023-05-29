import {
  IsBooleanString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class UserTaskBody {
  @IsNotEmpty({ message: 'typeId不能为空' })
  @IsInt({ message: 'typeId-参数类型错误' })
  typeId: number;

  @IsNotEmpty({ message: 'userId不能为空' })
  @IsInt({ message: 'userId-参数类型错误' })
  userId: number;
}

export class UserTaskParams {
  @IsNotEmpty({ message: 'typeId不能为空' })
  @IsInt({ message: 'typeId-参数类型错误' })
  typeId: number;

  @IsNotEmpty({ message: 'pageSize不能为空' })
  @IsInt({ message: 'pageSize-参数类型错误' })
  pageSize: number;

  @IsNotEmpty({ message: 'page不能为空' })
  @IsInt({ message: 'page-参数类型错误' })
  page: number;

  @IsNotEmpty({ message: 'startTime不能为空' })
  @IsInt({ message: 'startTime-参数类型错误' })
  startTime: number;

  @IsNotEmpty({ message: 'endTime不能为空' })
  @IsInt({ message: 'endTime-参数类型错误' })
  endTime: number;

  @IsNotEmpty({ message: 'status不能为空' })
  @IsInt({ message: 'status-参数类型错误' })
  status: number;
}

export class AddTaskParams {
  @IsNotEmpty({ message: 'typeId不能为空' })
  @IsInt({ message: 'typeId-参数类型错误' })
  typeId: number;

  @IsNotEmpty({ message: 'taskName不能为空' })
  @IsString({ message: 'taskName-参数类型错误' })
  taskName: string;

  @IsString({ message: 'taskContent-参数类型错误' })
  taskContent: string;
}

export class DelParams {
  @IsNotEmpty({ message: 'taskId不能为空' })
  @IsInt({ message: 'taskId-参数类型错误' })
  taskId: number;
}

export class DetailParams {
  @IsNotEmpty({ message: 'taskId不能为空' })
  @IsInt({ message: 'taskId-参数类型错误' })
  taskId: number;
}

export class UpdateTaskStatusParams {
  @IsNotEmpty({ message: 'taskId不能为空' })
  @IsInt({ message: 'taskId-参数类型错误' })
  taskId: number;

  @IsNotEmpty({ message: 'status不能为空' })
  @IsInt({ message: 'status-参数类型错误' })
  status: number;
}

export class UpdateTaskParams {
  @IsNotEmpty({ message: 'taskId不能为空' })
  @IsInt({ message: 'taskId-参数类型错误' })
  taskId: number;

  @IsNotEmpty({ message: 'typeId不能为空' })
  @IsInt({ message: 'typeId-参数类型错误' })
  typeId: number;

  @IsNotEmpty({ message: 'taskName不能为空' })
  @IsString({ message: 'taskName-参数类型错误' })
  taskName: string;

  @IsString({ message: 'taskContent-参数类型错误' })
  taskContent: string;
}

export class SearchParams {
  @IsNotEmpty({ message: 'taskName不能为空' })
  @IsString({ message: 'taskName-参数类型错误' })
  taskName: string;
}
