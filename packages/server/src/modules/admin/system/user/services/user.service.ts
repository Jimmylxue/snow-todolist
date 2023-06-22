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

  async findUserByPhone(phone: string) {
    return await this.userRepository.findOneBy({ phone });
  }

  async getDetailById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async updateUser(updateParams: any) {
    const { userId, ...params } = updateParams;
    const qb = this.userRepository.createQueryBuilder('user');
    qb.update(User)
      .set(params)
      .where('user.id = :userId', { userId })
      .execute();
    return { status: 1, message: '更新成功' };
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
