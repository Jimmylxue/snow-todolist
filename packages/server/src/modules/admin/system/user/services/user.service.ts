import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
// import { JwtStrategy } from '../auth/jwtStrategy.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  addUser(params) {
    // this.userRepository.createQueryBuilder().ins
    return this.userRepository.insert(params);
  }

  async findUser(phone: string) {
    return await this.userRepository.findOneBy({ phone });
  }

  async createToken(user) {
    const payload = { username: user.username, userId: user.id };
    //在实际项目中一般要进行数据库验证查看用户用户名密码是否正确
    //const data = await this.userRepository.findOne({username:user.username, password: user.password})
    //if(!data) {
    // return {code: 1 , msg:'登录失败', data: ''}
    //}
    delete user.password;
    return {
      msg: '登录成功',
      code: 200,
      result: {
        user: user,
        //得到token
        token: await this.jwtService.sign(payload),
      },
    };
  }
}
