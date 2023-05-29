import { Module } from '@nestjs/common';
import { TaskModule } from './modules/task/task.module';
import { TaskTypeModule } from './modules/taskType/taskType.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../admin/system/auth/constats';
import { BcryptService } from '../admin/system/auth/auth.service';
import { JwtStrategy } from '../admin/system/auth/jwtStrategy.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '3h',
      },
    }),
    TaskTypeModule,
    TaskModule,
  ],
  providers: [BcryptService, JwtStrategy],
  controllers: [],
})
export class TodoListModule {}
