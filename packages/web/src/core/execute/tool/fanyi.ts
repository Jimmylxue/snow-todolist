import { TSnowTerminal } from '@/types/TSnowTerminal';
import { post } from '@/api/index';
import {
  languageMap,
  TBaiduFanyi,
  TRequestParams,
  TShortEn,
} from '@/types/TBaiduFanyi';
import { isChinese } from '@/utils/index';

const languageMapKeyList = Object.keys(languageMap);

export const fanyiCommand = {
  start: 'fanyi',
  hint: 'fanyi <要翻译的内容> [-f 源语言] [-t 目标语言]',
  desc: '快速翻译',
  params: [
    {
      key: 'word',
      desc: '翻译源语言文本',
      isRequire: true, // 是否必填
    },
  ],
  options: [
    {
      key: 'from',
      desc: '源语言',
      alias: ['-f'],
      type: 'string',
      default: 'zh',
    },
    {
      key: 'to',
      desc: '目标语言',
      alias: ['-t'],
      type: 'string',
      default: 'en',
    },
  ],
};

export async function fanyiExecute(
  instruct: string,
  terminal: TSnowTerminal,
  fullInstruct: string,
) {
  const fanyiParams = {
    _: '',
    from: fanyiCommand.options[0].default as TShortEn,
    to: fanyiCommand.options[1].default as TShortEn,
  };
  let fromLan, toLan;
  if (
    instruct.trimStart().includes(' -f ') &&
    instruct?.split(' -f ')[1].includes(' -t ')
  ) {
    fromLan = instruct.split(' -f ')[1]?.split(' -t')[0]?.trim();
    toLan = instruct.split(' -t ')[1].trim();
    fanyiParams._ = instruct.split(' -f ')[0].trimStart();
    if (languageMapKeyList.includes(fromLan)) {
      fanyiParams.from = fromLan as TShortEn;
    } else {
      terminal.showError(
        `翻译源语言错误 输入: fanyi --help 查看帮助信息`,
        fullInstruct,
      );
      return;
    }

    if (languageMapKeyList.includes(toLan)) {
      fanyiParams.to = fromLan as TShortEn;
    } else {
      terminal.showError(
        `翻译目标语言错误 输入: fanyi --help 查看帮助信息`,
        fullInstruct,
      );
      return;
    }
  } else if (instruct.trimStart().includes(' -f ')) {
    fanyiParams._ = instruct.split(' -f ')[0].trimStart();
    fromLan = instruct.split(' -f ')[1].trim();
    if (languageMapKeyList.includes(fromLan)) {
      fanyiParams.from = fromLan as TShortEn;
    } else {
      terminal.showError(
        `翻译源语言错误 输入: fanyi --help 查看帮助信息`,
        fullInstruct,
      );
      return;
    }
  } else if (instruct.trimEnd().includes(' -t ')) {
    fanyiParams._ = instruct.split(' -t ')[0].trim();
    toLan = instruct.split(' -t ')[1].trim();
    if (languageMapKeyList.includes(toLan)) {
      fanyiParams.to = toLan as TShortEn;
    } else {
      terminal.showError(
        `翻译目标语言错误 输入: fanyi --help 查看帮助信息`,
        fullInstruct,
      );
      return;
    }
  } else {
    fanyiParams._ = instruct.trim();
    if (!isChinese(fanyiParams._)) {
      // 输入不是中文 默认按照 英译汉处理
      fanyiParams.from = 'en';
      fanyiParams.to = 'zh';
    }
  }

  console.log('instruct--------', instruct);
  console.log('analyze-------------------↓', fanyiParams);

  const res = await post<TBaiduFanyi, TRequestParams>('translate/base', {
    q: fanyiParams._,
    from: fanyiParams.from,
    to: fanyiParams.to,
  });

  console.log('fanyi_res~~~', res);
  if (res.code === 200) {
    // 接口翻译成功
    terminal.showSuccess(
      `翻译结果：${res.result?.trans_result?.[0].dst}`,
      fullInstruct,
    );
  } else {
    // 接口翻译失败
    terminal.showError(
      `${res.result?.message}：${res.result?.result.error_code} - ${res.result?.result.error_msg}`,
      fullInstruct,
    );
  }
}
