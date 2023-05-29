import { TSnowTerminal } from '@/types/TSnowTerminal';

export const bgAutoCommand = {
  start: 'bgAuto',
  hint: 'bgAuto [开关：on 开启, off关闭]',
  desc: '每日自动更新壁纸',
  params: [],
  options: [],
  case: ['on', 'off'],
};

export function bgAutoExecute(
  instruct: string,
  terminal: TSnowTerminal,
  fullInstruct: string,
) {
  const instr = instruct.trim();
  if (!bgAutoCommand.case.includes(instr)) {
    terminal.showError(`请输入正确指令 ：${bgAutoCommand.hint}`, fullInstruct);
    return;
  }

  if (['on', 'ON'].includes(instr)) {
    terminal.setBgAutoShow('bg_auto_on');
    terminal.showSuccess('设置成功', fullInstruct);
  }

  if (['off', 'OFF'].includes(instr)) {
    terminal.setBgAutoShow('bg_auto_off');
    terminal.showSuccess('设置成功', fullInstruct);
  }
}
