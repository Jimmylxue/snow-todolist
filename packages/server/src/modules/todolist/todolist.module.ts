import { Module } from '@nestjs/common';
import { TaskModule } from './modules/task/task.module';
import { TaskTypeModule } from './modules/taskType/taskType.module';

@Module({
  imports: [TaskTypeModule, TaskModule],
  providers: [],
  controllers: [],
})
export class TodoListModule {}
