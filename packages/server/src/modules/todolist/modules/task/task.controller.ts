import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  UserTaskParams,
  DetailParams,
  AddTaskParams,
  DelParams,
  UpdateTaskParams,
  UpdateTaskStatusParams,
  SearchParams,
} from './dto/task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/list')
  async getUserType(@Body() req: UserTaskParams, @Req() auth) {
    const { page, pageSize, startTime, endTime, status, typeId } = req;
    const { user } = auth;
    const userId = user.userId;
    const { result, total } = await this.taskService.getUserTask(
      userId,
      page,
      pageSize,
      startTime,
      endTime,
      status,
      typeId,
    );
    return {
      code: 200,
      message: '请求成功',
      result: {
        page,
        result,
        total,
      },
    };
  }

  @Post('/detail')
  async getTypeDetail(@Body() req: DetailParams) {
    const { taskId } = req;
    const taskTypes = await this.taskService.getTaskDetail(+taskId);
    return {
      code: 200,
      result: taskTypes,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/add')
  async addUserType(@Body() req: AddTaskParams, @Req() auth) {
    const { typeId, taskName, taskContent } = req;
    const { user } = auth;
    const userId = user.userId;
    const params = {
      userId,
      typeId,
      taskName,
      taskContent,
      createTime: String(Date.now()),
    };
    const tasks = await this.taskService.addUserTask(params);
    return {
      code: 200,
      result: tasks,
    };
  }

  @Post('/del')
  async delType(@Body() req: DelParams) {
    const { taskId } = req;
    const tasks = await this.taskService.delTask(+taskId);
    return {
      code: 200,
      result: tasks,
    };
  }

  // 编辑任务状态
  @UseGuards(AuthGuard('jwt'))
  @Post('/updateStatus')
  async updateTaskStatus(@Body() req: UpdateTaskStatusParams, @Req() auth) {
    const timeString = Date.now();
    const { user } = auth;
    const userId = user.userId;
    const params: any = {
      ...req,
      userId,
    };
    if (req.status === 1) {
      params.completeTime = timeString;
    }
    params.updateTime = timeString;
    const tasks = await this.taskService.updateTaskStatus(params);
    return {
      code: 200,
      result: '更新成功',
    };
  }

  // 编辑任务的基本信息
  @UseGuards(AuthGuard('jwt'))
  @Post('/update')
  async updateTask(@Body() req: UpdateTaskParams, @Req() auth) {
    const timeString = Date.now();
    const { user } = auth;
    const userId = user.userId;
    const params: any = {
      ...req,
      userId,
    };
    params.updateTime = timeString;
    const tasks = await this.taskService.updateTask(params);
    return {
      code: 200,
      result: '更新成功',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/search')
  async getSearchTask(@Body() req: SearchParams, @Req() auth) {
    const { taskName } = req;
    const { user } = auth;
    const userId = user.userId;
    const searchRes = await this.taskService.getTaskListByName(
      userId,
      taskName,
    );
    return {
      code: 200,
      result: searchRes,
    };
  }
}
