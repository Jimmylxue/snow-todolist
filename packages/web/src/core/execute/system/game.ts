import { TSnowTerminal } from '@/types/TSnowTerminal';

const gameList = [
  'gobang', // 五子棋
];

export const gameCommand = {
  start: 'game',
  hint: `game [游戏名]; 如: game gobang; 目前已有游戏：${gameList.join('、')}`,
  desc: `小游戏 目前已有游戏：${gameList.join('、')}`,
  params: [
    {
      key: 'word',
      desc: '即将玩的小游戏',
      isRequire: true, // 是否必填
    },
  ],
};

export async function gameExecute(
  instruct: string,
  terminal: TSnowTerminal,
  fullInstruct: string,
) {
  console.log({ instruct, fullInstruct });
  const gameName = instruct.trim();
  if (gameName && gameList.includes(gameName)) {
    switch (gameName) {
      case 'gobang':
        terminal.addInstructRecord({
          type: 'GAME_Gobang',
          instruct: fullInstruct,
        });
        return;
    }
    return;
  }
  terminal.showError(`请输入正确指令 ：${gameCommand.hint}`, fullInstruct);
}
