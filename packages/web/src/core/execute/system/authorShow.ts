import { TSnowTerminal } from '@/types/TSnowTerminal'

export const authorShowCommand = {
	start: 'authorShow',
	hint: 'authorShow [开关：on 开启, off关闭]',
	desc: '显示作者信息',
	options: [],
	params: [],
	case: ['on', 'off'],
}

export function authorShowExecute(
	instruct: string,
	terminal: TSnowTerminal,
	fullInstruct: string
) {
	const instr = instruct.trim()
	if (!authorShowCommand.case.includes(instr)) {
		terminal.showError(
			`请输入正确指令 ：${authorShowCommand.hint}`,
			fullInstruct
		)
		return
	}

	if (['on', 'ON'].includes(instr)) {
		terminal.setSystemShow('AUTHOR_SHOW_ON')
		terminal.showSuccess('设置成功', fullInstruct)
	}

	if (['off', 'OFF'].includes(instr)) {
		terminal.setSystemShow('AUTHOR_SHOW_OFF')
		terminal.showSuccess('设置成功', fullInstruct)
	}
}
