import { get } from '@/api/index'
import { TBgType } from '@/types/TBackground'
import { TSnowTerminal } from '@/types/TSnowTerminal'

export async function bgExecute(instruct: string, terminal: TSnowTerminal) {
	if (instruct?.trim()) {
		// 有地址
		terminal.changeBackGround(instruct.trim())
		return
	}
	const res = await get<TBgType>('background/base')
	terminal.changeBackGround(res.result?.imgurl!)
}

export const bgCommand = {
	start: 'bg',
	hint: 'background [图片地址（不填则随机）]',
	desc: '背景设置',
	params: [
		{
			key: 'word',
			desc: '自定义背景图片链接',
			isRequire: false, // 是否必填
		},
	],
	options: [],
}
