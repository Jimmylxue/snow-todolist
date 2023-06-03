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

  @UseGuards(AuthGuard('jwt'))
  @Post('/detail')
  async getTypeDetail(@Body() req: DetailParams, @Req() auth) {
    const { taskId } = req;
    const { user } = auth;
    const userId = user.userId;
    const task = await this.taskService.getTaskDetail(+taskId, userId);
    if (!task) {
      return {
        code: 500,
        message: '参数错误-请检查参数是否一致',
      };
    }
    return {
      code: 200,
      result: task,
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
    const { status, id } = await this.taskService.addUserTask(params);
    if (status === 1) {
      const task = await this.taskService.getTaskDetail(id, userId);
      return {
        code: 200,
        result: task,
        message: '添加成功',
      };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/del')
  async delType(@Body() req: DelParams, @Req() auth) {
    const { taskId } = req;
    const { user } = auth;
    const userId = user.userId;
    const whetherCorrect = await this.taskService.hasTask(taskId, userId);
    if (!whetherCorrect) {
      return {
        code: 500,
        message: '参数错误-请检查参数是否一致',
      };
    }
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

    const whetherCorrect = await this.taskService.hasTask(req.taskId, userId);
    if (!whetherCorrect) {
      return {
        code: 500,
        message: '参数错误-请检查参数是否一致',
      };
    }

    const params: any = {
      ...req,
      userId,
    };
    if (req.status === 1) {
      params.completeTime = timeString;
    }
    params.updateTime = timeString;
    await this.taskService.updateTaskStatus(params);
    const task = await this.taskService.getTaskDetail(req.taskId, userId);
    return {
      code: 200,
      result: { ...task, status: req.status },
      message: '更新成功',
    };
  }

  // 编辑任务的基本信息
  @UseGuards(AuthGuard('jwt'))
  @Post('/update')
  async updateTask(@Body() req: UpdateTaskParams, @Req() auth) {
    const timeString = Date.now();
    const { user } = auth;
    const userId = user.userId;

    const whetherCorrect = await this.taskService.hasTask(req.taskId, userId);
    if (!whetherCorrect) {
      return {
        code: 500,
        message: '参数错误-请检查参数是否一致',
      };
    }

    const params: any = {
      ...req,
      userId,
    };
    params.updateTime = timeString;
    await this.taskService.updateTask(params);
    const task = await this.taskService.getTaskDetail(req.taskId, userId);
    return {
      code: 200,
      result: {
        task,
        ...params,
      },
      message: '更新成功',
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
