import { TSnowTerminal } from '@/types/TSnowTerminal'

export async function timeExecute(instruct: string, terminal: TSnowTerminal) {}

export const timeCommand = {
	start: 'time',
	hint: '查看当前时间相关数据（打工人必备）',
	desc: '查看当前时间相关数据（打工人必备）',
	params: [],
	options: [],
}

/**
 * timeShow
 */

export const timeShowCommand = {
	start: 'timeShow',
	hint: 'timeShow [开关：on 开启, off关闭]',
	desc: '显示指令提示信息',
	params: [],
	options: [],
	case: ['on', 'off'],
}

export async function timeShowExecute(
	instruct: string,
	terminal: TSnowTerminal,
	fullInstruct: string
) {
	const instr = instruct.trim()
	if (!timeShowCommand.case.includes(instr)) {
		terminal.showError(`请输入正确指令 ：${timeShowCommand.hint}`, fullInstruct)
		return
	}

	if (['on', 'ON'].includes(instr)) {
		terminal.setSystemShow('TIME_SHOW_ON')
		terminal.showSuccess('设置成功', fullInstruct)
	}

	if (['off', 'OFF'].includes(instr)) {
		terminal.setSystemShow('TIME_SHOW_OFF')
		terminal.showSuccess('设置成功', fullInstruct)
	}
}
