import { TSnowTerminal } from '@/types/TSnowTerminal'

export function clearExecute(instruct: string, terminal: TSnowTerminal) {
	if (instruct.trim()) {
		// 有地址
		terminal.changeBackGround(instruct.trim())
		return
	}
	terminal.changeBackGround(
		'https://tva2.sinaimg.cn/large/9bd9b167gy1g2qkr9uavvj21hc0u01kx.jpg'
	)
}

export const clearCommand = {
	start: 'clear',
	hint: 'clear 清屏',
	desc: '清除屏幕记录',
	params: [],
	options: [],
}
