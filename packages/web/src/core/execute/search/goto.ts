export async function gotoExecute(instruct: string) {
	const gotoParams = {
		_: '',
		self: false,
	}
	if (instruct.trimEnd().endsWith(' -s')) {
		gotoParams.self = true
		gotoParams._ = instruct.trimEnd().split(' -s')[0]
	} else {
		gotoParams._ = instruct.trim()
	}

	if (!gotoParams.self) {
		window.open(`${gotoParams._.trim()}`)
	} else {
		window.open(`${gotoParams._.trim()}`, '_self')
	}
}

export const gotoCommand = {
	start: 'goto',
	hint: 'goto <目标链接> [-s 是否当前页面打开]',
	desc: '背景设置 - bing源',
	params: [
		{
			key: 'word',
			desc: '网页链接',
			isRequire: true, // 是否必填
		},
	],
	options: [
		{
			key: 'self',
			desc: '是否在当前页面打开',
			alias: ['-s'],
			type: 'boolean',
			default: false,
		},
	],
}
