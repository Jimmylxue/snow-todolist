import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { TaskType } from './entities/taskType.entity';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TaskType)
    private readonly taskTypeRepository: Repository<TaskType>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getUserTaskTypes(userId: number) {
    const taskTypes = await this.taskTypeRepository.findBy({ userId });
    return taskTypes;
  }

  async addUserTaskType(params: {
    userId: number;
    typeName: string;
    createTime: string;
  }) {
    await this.taskTypeRepository.insert(params);
    return { status: 1, message: '添加成功' };
  }

  async getUserTasks(userId: number, typeId: number) {
    const taskTypes = await this.taskRepository.findBy({ userId, typeId });
    return taskTypes;
  }
}
