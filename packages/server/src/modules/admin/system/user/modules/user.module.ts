import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { BcryptService } from '../../auth/auth.service';
import { JwtStrategy } from '../../auth/jwtStrategy.service';
import { UserController } from '../controllers/user/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../auth/constats';
import { TaskTypeService } from '@src/modules/todolist/modules/taskType/taskType.service';
import { TaskType } from '@src/modules/todolist/entities/taskType.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, TaskType]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '12h',
      },
    }),
  ],
  providers: [
    UserService,
    BcryptService,
    JwtStrategy,
    TaskTypeService,
    BcryptService,
  ],
  controllers: [UserController],
  // exports: [TypeOrmModule],
})
export class UsersModule {}
