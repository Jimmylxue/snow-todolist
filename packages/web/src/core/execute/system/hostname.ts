import { TSnowTerminal } from '@/types/TSnowTerminal'

export const hostnameCommand = {
	start: 'hostname',
	hint: 'hostname [主机名]',
	desc: '设置主机名',
	params: [
		{
			key: 'word',
			desc: '即将设置的主机名',
			isRequire: true, // 是否必填
		},
	],
}

export async function hostnameExecute(
	instruct: string,
	terminal: TSnowTerminal,
	fullInstruct: string
) {
	if (instruct.trim()) {
		// 有地址
		terminal.changeHostname(instruct.trim())
		terminal.showSuccess('设置成功', fullInstruct)
		return
	}
	terminal.showError(`请输入正确指令 ：${hostnameCommand.hint}`, fullInstruct)
}
