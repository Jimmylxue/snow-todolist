import { TSnowTerminal } from '@/types/TSnowTerminal'

export function resetExecute(terminal: TSnowTerminal, fullInstruct: string) {
	terminal.reset()
	terminal.showSuccess('重置成功', fullInstruct)
}

export const resetCommand = {
	start: 'reset',
	hint: '重置系统配置',
	desc: '重置系统配置',
	params: [],
	options: [],
}
