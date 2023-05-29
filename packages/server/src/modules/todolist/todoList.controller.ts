import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  AddUserTypeParams,
  UserTaskBody,
  UserTypeQuery,
} from './dto/todolist.dto';
import { TodoListService } from './todolist.service';

@Controller('todolist')
export class TodoListController {
  constructor(private readonly todolistService: TodoListService) {}

  @Get('/type')
  async getUserType(@Query() req: UserTypeQuery) {
    const { userId } = req;
    const taskTypes = await this.todolistService.getUserTaskTypes(+userId);
    return {
      code: 200,
      result: taskTypes,
    };
  }

  @Post('/addType')
  async addUserType(@Body() req: AddUserTypeParams) {
    const { userId, typeName } = req;
    const params = {
      userId,
      typeName,
      createTime: String(Date.now()),
    };
    console.log('sss');
    const tasks = await this.todolistService.addUserTaskType(params);
    return {
      code: 200,
      result: tasks,
    };
  }

  @Post('/list')
  async getUserTask(@Body() req: UserTaskBody) {
    const { userId, typeId } = req;
    const tasks = await this.todolistService.getUserTasks(+userId, +typeId);
    return {
      code: 200,
      result: tasks,
    };
  }
}
