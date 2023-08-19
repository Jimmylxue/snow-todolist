import { Module } from '@nestjs/common';
import { TaskModule } from './modules/task/task.module';
import { TaskTypeModule } from './modules/taskType/taskType.module';
import { GithubService } from './modules/github/github.service';
import { HttpModule } from '@nestjs/axios';
import { BaseModule } from './modules/base/base.module';

@Module({
  imports: [HttpModule, TaskTypeModule, TaskModule, BaseModule],
  providers: [GithubService],
  controllers: [],
})
export class TodoListModule {}
