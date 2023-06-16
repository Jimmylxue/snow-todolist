import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
const upyun = require('upyun');

const upyunConfig = {
  serviceName: '',
  operatorName: '',
  password: '',
};

const baseUrl = ''; // https://image.jimmyxuexue.top

@UseGuards(AuthGuard('jwt'))
@Controller('upload')
export class UploadController {
  constructor() {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const service = new upyun.Service(
      upyunConfig.serviceName,
      upyunConfig.operatorName,
      upyunConfig.password,
    );
    const client = new upyun.Client(service);
    const fileName = Date.now() + file.originalname;
    const res = await client.putFile('upload/' + fileName, file.buffer);
    if (res) {
      return {
        code: 200,
        message: '上传成功',
        result: `${baseUrl}/upload/${fileName}`,
      };
    }
    return {
      code: 500,
      message: '上传失败',
    };
  }
}
