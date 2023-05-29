import { searchPlatformList } from '@/hooks/const'
import { subStrBetween } from '@/utils/index'
import { TSnowTerminal } from '@/types/TSnowTerminal'

export const searchCommand = {
	start: 'search',
	hint: 'search <搜索内容> [-f from] [-s 是否当前页面打开]',
	desc: '在不同的平台快速搜索内容',
	params: [
		{
			key: 'word',
			desc: '搜索内容',
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
		{
			key: 'from',
			alias: ['-f'],
			desc: '搜索的地址',
			type: 'string',
			default: 'baidu',
		},
	],
}

export function searchExecute(
	instruct: string,
	terminal: TSnowTerminal,
	commandItem: any
) {
	const matchParams = {
		_: '',
		self: false,
		fromWay:
			subStrBetween(instruct, '-f', '-s').trim() ||
			commandItem?.options?.[1].default,
	}
	if (instruct.includes(' -f ') && instruct.trimEnd().endsWith(' -s')) {
		matchParams._ = instruct.split(' -f ')[0].trimStart()
		matchParams.self = true
	} else if (instruct.includes(' -f ')) {
		matchParams._ = instruct.split(' -f ')[0].trimStart()
	} else if (instruct.trimEnd().endsWith(' -s')) {
		matchParams._ = instruct.split(' -s')[0].trimStart()
		matchParams.self = true
	} else {
		matchParams._ = instruct.trimStart()
	}

	console.log('instruct--------', instruct)
	console.log('analyze-------------------↓', matchParams)
	console.log(
		`search ${matchParams._} -f ${matchParams.fromWay} ${
			matchParams.self ? '-s' : ''
		}`
	)
	const searchTarget = searchPlatformList.find(
		platform => platform.key === matchParams.fromWay
	)?.target
	if (!searchTarget) {
		terminal.showError('找不到搜索源', 'search ' + instruct.trim())
		// todo terminal 显示错误
		return
	}
	window.open(
		`${searchTarget}${matchParams._}`,
		`${matchParams.self ? '_self' : searchTarget + matchParams}`
	)
}
