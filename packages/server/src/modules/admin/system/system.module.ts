import { Module } from '@nestjs/common';
import { UsersModule } from './user/modules/user.module';
@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class SystemModule {}
