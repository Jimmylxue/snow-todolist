import { TSnowTerminal } from '@/types/TSnowTerminal'

export const welcomeCommand = {
	start: 'welcome',
	hint: 'welcome [终端提示文本（支持多个值，不填则无欢迎语）]',
	desc: '自定义终端欢迎语',
	options: [],
	params: [],
	case: [],
}

export function welcomeExecute(
	instruct: string,
	terminal: TSnowTerminal,
	fullInstruct: string
) {
	const instr = instruct.trim()
	terminal.setWelcomeText(instr || 'Welcome to SnowIndex, This is awesome!')
	terminal.showSuccess('设置成功', fullInstruct)
}
