import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
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

  @UseGuards(AuthGuard('jwt'))
  @Post('/detail')
  async getTypeDetail(@Body() req: DetailTypeParams, @Req() auth) {
    const { typeId } = req;
    const { user } = auth;
    const userId = user.userId;
    const taskTypes = await this.taskTypeService.getTaskTypeDetail(
      +typeId,
      userId,
    );
    if (!taskTypes) {
      return {
        code: 500,
        message: '参数错误-请检查参数是否一致',
      };
    }
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
    const { status, id } = await this.taskTypeService.addUserTaskType(params);
    if (status === 1) {
      const taskType = await this.taskTypeService.getTaskTypeDetail(id, userId);
      return {
        code: 200,
        result: taskType,
      };
    }
  }

  @Post('/del')
  async delType(@Body() req: DelTypeParams, @Req() auth) {
    const { user } = auth;
    const userId = user.userId;
    const whetherCorrect = await this.taskTypeService.hasTaskType(
      req.typeId,
      userId,
    );
    if (!whetherCorrect) {
      return {
        code: 500,
        message: '参数错误-请检查参数是否一致',
      };
    }
    const { typeId } = req;
    const tasks = await this.taskTypeService.delTaskType(+typeId);
    return {
      code: 200,
      result: tasks,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/update')
  async updateTask(@Body() req: UpdateTypeParams, @Req() auth) {
    const { user } = auth;
    const userId = user.userId;
    const whetherCorrect = await this.taskTypeService.hasTaskType(
      req.typeId,
      userId,
    );
    if (!whetherCorrect) {
      return {
        code: 500,
        message: '参数错误-请检查参数是否一致',
      };
    }
    const timeString = Date.now();
    const params: any = {
      ...req,
    };
    params.updateTime = timeString;
    await this.taskTypeService.updateTaskType(params);
    return {
      code: 200,
      result: { ...params, userId },
      message: '更新成功',
    };
  }
}
