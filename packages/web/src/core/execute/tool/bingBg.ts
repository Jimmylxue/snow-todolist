import { get } from '@/api/index'
import { TSnowTerminal } from '@/types/TSnowTerminal'

export async function bingBgExecute(instruct: string, terminal: TSnowTerminal) {
	const bgParams = {
		uhd: false,
	}
	if (instruct.trimEnd().endsWith(' -h')) {
		// bing 4K
		bgParams.uhd = true
	}

	const res = await get<string>(
		`bingBg/today?UHD=${bgParams.uhd ? 'true' : 'false'}`
	)
	terminal.changeBackGround(res?.result!)
}

export const bingBgCommand = {
	start: 'bingBg',
	hint: 'bing精品壁纸 [-h 支持4K]',
	desc: '背景设置 - bing源',
	params: [],
	options: [
		{
			key: 'uhd',
			desc: '是否使用高清bing壁纸',
			alias: ['-h'],
			type: 'boolean',
			default: false,
		},
	],
}
