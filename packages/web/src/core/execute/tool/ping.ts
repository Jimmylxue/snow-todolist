import { TSnowTerminal } from '@/types/TSnowTerminal'

export const pingCommand = {
	start: 'ping',
	hint: 'ping <检测的网站> [-t 请求超时时间(单位:毫秒)]',
	desc: '检测某个地址是否存活',
	params: [
		{
			key: 'dest',
			desc: '目标地址',
			isRequire: true, // 是否必填
		},
	],
	options: [
		{
			key: 'timeout',
			desc: '请求超时时间(单位:毫秒)',
			alias: ['-t'],
			type: 'string',
			default: '3000',
		},
	],
}

export async function pingExecute(
	instruct: string,
	terminal: TSnowTerminal,
	fullInstruct: string
) {
	const pingParams = {
		_: '',
		timeout: pingCommand.options[0].default,
	}

	if (instruct.trimStart().includes(' -t')) {
		pingParams._ = instruct.split(' -t')[0].trim()
		pingParams.timeout =
			instruct.split(' -t')[1].trim() || pingCommand.options[0].default
	} else {
		pingParams._ = instruct.trim()
	}

	let dest = pingParams._
	if (
		!dest.toLowerCase().startsWith('http://') &&
		!dest.toLowerCase().startsWith('https://')
	) {
		dest = 'https://' + dest
	}
	if (dest.toLowerCase().startsWith('http://')) {
		dest = dest.replace('http://', 'https://')
	}
	const startTime = new Date().getTime()
	await Promise.race([
		new Promise(function (_, reject) {
			setTimeout(() => reject(new Error('timeout')), Number(pingParams.timeout))
		}),
		fetch(dest, { mode: 'no-cors', cache: 'reload' }),
	])
		.then((resp: any) => {
			if (resp.ok || resp.status == 200 || resp.type == 'opaque') {
				console.log(resp)
				const finishTime = new Date().getTime()
				terminal.showSuccess(
					`目标地址正常，延迟=${(finishTime - startTime).toString()}ms`,
					fullInstruct
				)
			} else {
				terminal.showError(`ping 不通！`, fullInstruct)
			}
		})
		.catch(error => {
			console.log(error)
			terminal.showError(`ping 不通！`, fullInstruct)
		})
}
