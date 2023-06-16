// const crypto = require("crypto");
import crypto from 'crypto';

// MD5
export function MD5(value) {
  return crypto.createHash('md5').update(value).digest('hex');
}

// Base64
export function base64(value) {
  return Buffer.from(value).toString('base64');
}

// hmacsha1
export function hmacsha1(secret, value) {
  return crypto
    .createHmac('sha1', secret)
    .update(value, 'utf-8')
    .digest()
    .toString('base64');
}
