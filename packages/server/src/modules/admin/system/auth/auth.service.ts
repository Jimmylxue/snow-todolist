import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
  private static readonly SALT_ROUNDS: number = 10;
  /**
   * 对比检查密码
   * @param rawStr
   * @param hashedStr
   */
  async compare(rawStr: string, hashedStr: string) {
    return bcrypt.compare(rawStr, hashedStr);
  }
  /**
   * 生成 hash
   * @param rawStr
   * @param salt
   */
  async hash(rawStr: string, salt?: string) {
    return bcrypt.hash(rawStr, salt || BcryptService.SALT_ROUNDS);
  }
  /**
   * 生成盐
   */
  async genSalt() {
    return bcrypt.genSalt(BcryptService.SALT_ROUNDS);
  }
}
