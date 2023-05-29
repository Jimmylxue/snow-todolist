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
      host: 'us-east.connect.psdb.cloud', // mysql host
      port: 3306,
      username: '4azsnvlhhc698t2j2iiy', // 用户名
      password: 'pscale_pw_NhSkGnSEYh7VBDk5noALSN1iHX7c47OPmTU4dQXZE3D', // 密码
      database: 'snow-server', // 数据库名
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
