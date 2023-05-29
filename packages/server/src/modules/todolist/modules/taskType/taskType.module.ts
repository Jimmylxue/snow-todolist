import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskType } from '../../entities/taskType.entity';
import { TaskTypeController } from './taskType.controller';
import { TaskTypeService } from './taskType.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskType])],
  providers: [TaskTypeService],
  controllers: [TaskTypeController],
})
export class TaskTypeModule {}
