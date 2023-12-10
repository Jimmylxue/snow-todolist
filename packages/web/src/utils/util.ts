/**
 * 检查是否是qq邮箱
 * @param mail string
 */
export function isQQMail(mail: string) {
  return /^[1-9]\d{4,10}@qq\.com$/.test(mail);
}
