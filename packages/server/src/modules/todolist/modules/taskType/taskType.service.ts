import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskType } from '../../entities/taskType.entity';

@Injectable()
export class TaskTypeService {
  constructor(
    @InjectRepository(TaskType)
    private readonly taskTypeRepository: Repository<TaskType>,
  ) {}

  async getUserTaskTypes(userId: number) {
    const taskTypes = await this.taskTypeRepository.findBy({ userId });
    return taskTypes;
  }

  async getTaskTypeDetail(typeId: number, userId) {
    const taskType = await this.taskTypeRepository.findOneBy({
      typeId,
      userId,
    });
    return taskType;
  }

  async addUserTaskType(params: {
    userId: number;
    typeName: string;
    createTime: string;
  }) {
    await this.taskTypeRepository.insert(params);
    return { status: 1, message: '添加成功' };
  }

  async delTaskType(typeId: number) {
    await this.taskTypeRepository.delete({ typeId });
    return { status: 1, message: '删除成功' };
  }

  async updateTaskType(updateParams: any) {
    const { typeId, ...params } = updateParams;
    const qb = this.taskTypeRepository.createQueryBuilder('taskType');
    qb.update(TaskType)
      .set(params)
      .where('taskType.typeId = :typeId', { typeId })
      .execute();
    return { status: 1, message: '更新成功' };
  }

  async hasTaskType(typeId, userId): Promise<boolean> {
    const taskType = await this.getTaskTypeDetail(typeId, userId);
    return !!taskType;
  }
}
