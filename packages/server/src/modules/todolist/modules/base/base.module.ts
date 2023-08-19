import { Module } from '@nestjs/common';
import { BaseController } from './base.controller';
import { HttpModule } from '@nestjs/axios';
import { BaseService } from './base.service';
import { GithubService } from '../github/github.service';

@Module({
  imports: [HttpModule],
  providers: [BaseService, GithubService],
  controllers: [BaseController],
})
export class BaseModule {}
