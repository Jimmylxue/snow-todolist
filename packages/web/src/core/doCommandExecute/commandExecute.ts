import { TSnowTerminal } from '@/types/TSnowTerminal';
import {
  baiduExecute,
  bgExecute,
  biliExecute,
  githubExecute,
  googleExecute,
  juejinExecute,
  resetExecute,
  searchExecute,
  authorShowExecute,
  welcomeExecute,
  weatherExecute,
  wangYiYunExecute,
  bingBgExecute,
  gotoExecute,
  hintShowExecute,
  hostnameExecute,
  fanyiExecute,
  varbookExecute,
  pingExecute,
  timeShowExecute,
  npmExecute,
  jumpExecute,
  bgAutoExecute,
  gameExecute,
} from '@/core/execute';
import { zhihuExecute } from '@/core/execute/search/zhihu';
import { isHelpInstruct } from '../../utils';
import { parseExecuteCommand } from './executeUtil';
import { useNavigate } from 'react-router-dom';

export function useCommand() {
  const navigate = useNavigate();

  const doCommandExecute = (instruct: string, terminal: TSnowTerminal) => {
    const {
      isCorrect,
      startCommand,
      fullCommand,
      commandBody,
      systemCommandInfo,
    } = parseExecuteCommand(instruct);
    if (!isCorrect) {
      terminal.showError('找不到命令（输入 help 查看命令列表）', fullCommand);
      return;
    }
    // 统一处理help指令
    if (isHelpInstruct(startCommand!, fullCommand)) {
      terminal.addInstructRecord({
        type: 'INSTRUCT_ITEM_HELP',
        instruct,
        helpKey: startCommand,
      });
      return;
    }
    // 细节操作
    switch (startCommand!) {
      case 'search':
        searchExecute(commandBody!, terminal, systemCommandInfo);
        return;
      case 'help':
        terminal.addInstructRecord({ type: 'HELP', instruct });
        return;
      case 'baidu':
        baiduExecute(commandBody!);
        terminal.addInstructRecord({ type: 'INSTRUCT', instruct });

        return;
      case 'github':
        githubExecute(commandBody!);
        terminal.addInstructRecord({ type: 'INSTRUCT', instruct });

        return;
      case 'google':
        googleExecute(commandBody!);
        terminal.addInstructRecord({ type: 'INSTRUCT', instruct });

        return;
      case 'juejin':
        juejinExecute(commandBody!);
        terminal.addInstructRecord({ type: 'INSTRUCT', instruct });

        return;
      case 'zhihu':
        zhihuExecute(commandBody!);
        terminal.addInstructRecord({ type: 'INSTRUCT', instruct });

        return;
      case 'bili':
        biliExecute(commandBody!);
        terminal.addInstructRecord({ type: 'INSTRUCT', instruct });

      case 'wangyiyun':
        wangYiYunExecute(commandBody!);
        terminal.addInstructRecord({ type: 'INSTRUCT', instruct });
        return;

      case 'goto':
        gotoExecute(commandBody!);
        terminal.addInstructRecord({ type: 'INSTRUCT', instruct });
        return;

      case 'bg':
        bgExecute(commandBody!, terminal);
        terminal.addInstructRecord({ type: 'INSTRUCT', instruct });
        return;

      case 'hostname':
        hostnameExecute(commandBody!, terminal, instruct);
        return;

      case 'bingBg':
        bingBgExecute(commandBody!, terminal);
        terminal.addInstructRecord({ type: 'INSTRUCT', instruct });
        return;
      case 'reset':
        resetExecute(terminal, instruct);
        return;

      case 'info':
        terminal.addInstructRecord({ type: 'INFO', instruct });
        return;
      case 'clear':
        terminal.addInstructRecord({ type: 'INSTRUCT', instruct });
        terminal.clear();
        return;

      case 'authorShow':
        authorShowExecute(commandBody!, terminal, instruct);
        return;

      case 'hintShow':
        hintShowExecute(commandBody!, terminal, instruct);
        return;

      case 'welcome':
        welcomeExecute(commandBody!, terminal, instruct);
        return;

      case 'weather':
        weatherExecute(commandBody!, terminal, instruct);
        return;

      case 'history':
        terminal.addInstructRecord({ type: 'HISTORY', instruct });
        return;

      case 'date':
        terminal.addInstructRecord({ type: 'DATE', instruct });
        return;

      case 'fanyi':
        fanyiExecute(commandBody!, terminal, instruct);
        return;

      case 'shortcut':
        terminal.addInstructRecord({ type: 'SHORTCUT', instruct });
        return;

      case 'time':
        terminal.addInstructRecord({ type: 'TIME', instruct });
        return;

      case 'timeShow':
        timeShowExecute(commandBody!, terminal, instruct);
        return;

      case 'varbook':
        varbookExecute(commandBody!, terminal, instruct);
        return;

      case 'ping':
        pingExecute(commandBody!, terminal, instruct);
        return;

      case 'npm':
        npmExecute(commandBody!, instruct);
        terminal.addInstructRecord({ type: 'INSTRUCT', instruct });
        return;

      case 'jump':
      case 'j':
        jumpExecute(commandBody!, terminal, instruct);
        return;

      case 'chatroom':
        navigate('/chatRoom');
        return;

      case 'bgAuto':
        bgAutoExecute(commandBody!, terminal, instruct);
        return;

      case 'game':
        gameExecute(commandBody!, terminal, instruct);
        return;

      default:
        terminal.addInstructRecord({ type: 'INSTRUCT', instruct });
        terminal.focusInput();
        break;
    }
  };

  return { doCommandExecute };
}
