import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './modules/admin/admin.module';
import { NestLogsModule } from 'nest-logs';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './schedule/task.module';
import { TodoListModule } from './modules/todolist/todolist.module';
@Module({
  imports: [
    NestLogsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '', // mysql host
      port: 3306,
      username: '', // 用户名
      password: '', // 密码
      database: '', // 数据库名
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      ssl: {},
    }),
    AdminModule,
    TodoListModule,
    ScheduleModule.forRoot(),
    TasksModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
