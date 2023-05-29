import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  AddUserTypeParams,
  DelTypeParams,
  DetailTypeParams,
  UpdateTypeParams,
} from './dto/taskType.dto';
import { TaskTypeService } from './taskType.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('taskType')
export class TaskTypeController {
  constructor(private readonly taskTypeService: TaskTypeService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('/list')
  async getUserType(@Req() auth) {
    const { user } = auth;
    const taskTypes = await this.taskTypeService.getUserTaskTypes(+user.userId);
    return {
      code: 200,
      result: taskTypes,
    };
  }

  @Post('/detail')
  async getTypeDetail(@Body() req: DetailTypeParams) {
    const { typeId } = req;
    const taskTypes = await this.taskTypeService.getTaskTypeDetail(+typeId);
    return {
      code: 200,
      result: taskTypes,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/add')
  async addUserType(@Body() req: AddUserTypeParams, @Req() auth) {
    const { typeName, desc } = req;
    const { user } = auth;
    const userId = user.userId;
    const params = {
      userId,
      typeName,
      desc,
      createTime: String(Date.now()),
    };
    const tasks = await this.taskTypeService.addUserTaskType(params);
    return {
      code: 200,
      result: tasks,
    };
  }

  @Post('/del')
  async delType(@Body() req: DelTypeParams) {
    const { typeId } = req;
    const tasks = await this.taskTypeService.delTaskType(+typeId);
    return {
      code: 200,
      result: tasks,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/update')
  async updateTask(@Body() req: UpdateTypeParams) {
    const timeString = Date.now();
    const params: any = {
      ...req,
    };
    params.updateTime = timeString;
    const tasks = await this.taskTypeService.updateTaskType(params);
    return {
      code: 200,
      result: '更新成功',
    };
  }
}
