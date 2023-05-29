import { get } from '@/api/index'
import { TSnowTerminal } from '@/types/TSnowTerminal'
import { TVarBookResult } from '@/types/TVarbook'

export async function varbookExecute(
	instruct: string,
	terminal: TSnowTerminal,
	fullInstruct: string
) {
	if (instruct.trim() === '') {
		terminal.showError('请输入变量名', fullInstruct)
		return
	}
	const res = await get<TVarBookResult>(
		`https://api-varbook.uiuing.com/translate?s=${enBase64(instruct.trim())}`
	)
	if (res.code === 200) {
		terminal.addInstructRecord({
			type: 'VAR_BOOK',
			instruct: fullInstruct,
			// @ts-ignore
			result: res.data,
		})
	} else {
		terminal.showError(res.msg, fullInstruct)
	}
}

export const varbookCommand = {
	start: 'varbook',
	hint: '变量命名工具',
	desc: '变量命名工具',
	params: [],
	options: [],
}

function enBase64(oldValue: string) {
	return btoa(encodeURI(oldValue))
}
