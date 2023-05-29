import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { RegisterDto } from '../../dto/register.dto';
import { LoginDto } from '../../dto/login.dto';
import { TaskTypeService } from '@src/modules/todolist/modules/taskType/taskType.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly taskType: TaskTypeService,
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
    if (user && user.password === password) {
      return await this.usersService.createToken(user, password);
    }
    return {
      code: 10000,
      result: '密码错误',
    };
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
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
}
