// const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export async function encrypt(rawStr: string) {
  const res = await bcrypt.hash(rawStr, SALT_ROUNDS);
  console.log({ res });
  return res;
}

export async function compare(rawStr: string, hashedStr: string) {
  return await bcrypt.compare(rawStr, hashedStr);
}
