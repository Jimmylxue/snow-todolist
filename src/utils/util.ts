/**
 * 检查是否是qq邮箱
 * @param mail string
 */
export function isQQMail(mail: string) {
  return /^[1-9]\d{4,10}@qq\.com$/.test(mail);
}

/**
 * 获取进一周 日期数据
 */
export function getNearWeekDateMessage() {
  let result = [];
  let today = new Date();
  let chineseDayOfWeek = ['日', '一', '二', '三', '四', '五', '六'];
  for (let i = 0; i < 7; i++) {
    let pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i);
    let day = pastDate.getDay();
    let dayOfWeek = '星期' + chineseDayOfWeek[day];
    let formattedDate =
      pastDate.getFullYear() +
      '年' +
      (pastDate.getMonth() + 1) +
      '月' +
      pastDate.getDate() +
      '日';
    result.push({ date: formattedDate, dayOfWeek: dayOfWeek });
  }
  return result.reverse();
}
