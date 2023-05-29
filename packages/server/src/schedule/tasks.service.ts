import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private httpService: HttpService) {}
  // @Cron('10 00 09 * * *', {
  @Cron('10 00 09 * * *', {
    name: 'everyday_send',
    timeZone: 'Asia/Chongqing',
  })
  async handleCron() {
    await this.httpService.axiosRef.get(
      'http://www.jimmyxuexue.top:9999/vitality/today',
    );
    setTimeout(() => {
      this.httpService.axiosRef.get(
        'http://www.jimmyxuexue.top:9999/vitality/important',
      );
    }, 1000);
  }

  // @Interval(10000)
  // handleInterval() {
  //   console.log('aaaaa,任务来了');
  //   // this.logger.debug('Called every 10 seconds');
  // }

  // @Timeout(5000)
  // handleTimeout() {
  //   this.logger.debug('Called once after 5 seconds');
  // }
}
