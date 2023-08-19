import { IsNotEmpty, IsString } from 'class-validator';

export class GetCommitDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名类型错误' })
  user: string;

  @IsNotEmpty({ message: '仓库名不能为空' })
  @IsString({ message: '仓库名类型错误' })
  repos: string;

  @IsNotEmpty({ message: '分支名不能为空' })
  @IsString({ message: '分支名类型错误' })
  branch: string;

  @IsNotEmpty({ message: '开始时间不能为空' })
  @IsString({ message: '开始时间类型错误' })
  startTime: string;
}
