import { TSnowTerminal } from '@/types/TSnowTerminal'

export const hintShowCommand = {
	start: 'hintShow',
	hint: 'hintShow [开关：on 开启, off关闭]',
	desc: '显示指令提示信息',
	params: [],
	options: [],
	case: ['on', 'off'],
}

export function hintShowExecute(
	instruct: string,
	terminal: TSnowTerminal,
	fullInstruct: string
) {
	const instr = instruct.trim()
	if (!hintShowCommand.case.includes(instr)) {
		terminal.showError(`请输入正确指令 ：${hintShowCommand.hint}`, fullInstruct)
		return
	}

	if (['on', 'ON'].includes(instr)) {
		terminal.setSystemShow('HINT_SHOW_ON')
		terminal.showSuccess('设置成功', fullInstruct)
	}

	if (['off', 'OFF'].includes(instr)) {
		terminal.setSystemShow('HINT_SHOW_OFF')
		terminal.showSuccess('设置成功', fullInstruct)
	}
}
