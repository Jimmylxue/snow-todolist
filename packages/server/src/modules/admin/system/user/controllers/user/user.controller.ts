import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { RegisterDto } from '../../dto/register.dto';
import { LoginDto } from '../../dto/login.dto';
import { TaskTypeService } from '@src/modules/todolist/modules/taskType/taskType.service';
import { BcryptService } from '../../../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly taskType: TaskTypeService,
    private readonly bcryptService: BcryptService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const { phone, password } = body;
    let user = await this.usersService.findUser(phone);
    if (!user) {
      return {
        code: 10000,
        result: '账号或密码错误',
      };
    }
    if (+user.id <= 28) {
      /**
       * id 为 28是最后一个明文密码用户
       */
      const compareRes = await this.bcryptService.compare(
        user.password,
        password,
      );
      if (compareRes) {
        return await this.usersService.createToken(user, user.password);
      }
      return {
        code: 10000,
        result: '账号或密码错误',
      };
    } else {
      /**
       * id 大于 28 都是 加密密码 使用 atob 获取原密码
       */
      const originUserPassword = atob(user.password).split(
        'snow-todoList',
      )?.[0];
      const compareHashSuccess = await this.bcryptService.compare(
        originUserPassword,
        password,
      );
      if (compareHashSuccess) {
        return await this.usersService.createToken(user, user.password);
      }
      return {
        code: 10000,
        result: '账号或密码错误',
      };
    }
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    // 注册时 传的密码 使用的是 btoa 处理过的密码
    const params = body;

    let res1 = await this.usersService.findUser(body.phone);
    if (res1) {
      return {
        code: 10000,
        result: '该手机号已被注册',
      };
    }
    if (!params.avatar)
      params.avatar = 'https://avatars.githubusercontent.com/u/65758455?v=4';
    await this.usersService.addUser({
      ...params,
      createTime: Date.now(),
    });

    let user = await this.usersService.findUser(body.phone);

    const registerUserId = user.id;

    this.taskType.addUserTaskType({
      userId: registerUserId,
      typeName: '工作',
      createTime: Date.now() + '',
    });

    return {
      code: 200,
      result: '注册成功',
    };
  }

  @Get('/test')
  async test() {
    const params = 'jimmy';
    const tempParams =
      '$2a$10$eQ115CBwrMRm/F/iqKNtj.3u1KepBXBlO2ZSQfCCM4x2YHTaTLfRu';
    const res = await this.bcryptService.hash(params);
    const compareRes = await this.bcryptService.compare(params, tempParams);
    const compareRes2 = await this.bcryptService.compare(params + 't', res);
    const compareRes3 = await this.bcryptService.compare(
      '$2a$10$nSmuja0ZldJGhSKvptp.pO6KIt7F8ZnxbNOgHT6Is1mlx91zjzOT.',
      '$2a$10$MC57CJ2oQFKzJzCshgFjvOkjaFJErMcI1HeHoNMTa0rntvzTAvqXa',
    );
    return {
      res,
      compareRes,
      compareRes2,
      compareRes3,
    };
  }
}
