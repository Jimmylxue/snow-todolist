import { TSnowTerminal } from '@/types/TSnowTerminal'

export function historyExecute(instruct: string, terminal: TSnowTerminal) {
	terminal.addInstructRecord({ type: 'HISTORY', instruct })
}

export const historyCommand = {
	start: 'history',
	hint: 'history',
	desc: '查看历史指令',
	params: [],
	options: [],
}
