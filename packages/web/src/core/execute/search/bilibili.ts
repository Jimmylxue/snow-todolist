import { searchPlatformList } from '@/hooks/const'

export function biliExecute(instruct: string) {
	const biliParams = {
		_: '',
		self: false,
		user: false,
	}
	if (
		instruct.trimStart().includes(' -u') &&
		instruct.trimEnd().endsWith(' -s')
	) {
		biliParams._ = instruct.split(' -u')[0].trimStart()
		biliParams.self = true
		biliParams.user = true
	} else if (instruct.trimStart().includes(' -u')) {
		biliParams._ = instruct.split(' -u')[0].trimStart()
		biliParams.user = true
	} else if (instruct.trimEnd().endsWith(' -s')) {
		biliParams._ = instruct.split(' -s')[0].trimStart()
		biliParams.self = true
	} else {
		biliParams._ = instruct.trimStart()
	}

	console.log('instruct--------', instruct)
	console.log('analyze-------------------↓', biliParams)
	console.log(
		`search ${biliParams._} -f ${biliParams.user} ${
			biliParams.self ? '-s' : ''
		}`
	)

	const searchTarget = searchPlatformList.find(
		platform => platform.key === (biliParams.user ? 'biliUser' : 'bili')
	)?.target

	window.open(
		`${searchTarget}${biliParams._.trim()}`,
		`${biliParams.self ? '_self' : searchTarget! + biliParams}`
	)
}

export const biliCommand = {
	start: 'bili',
	hint: 'bilibili <搜索内容> [-u 是否搜索作者] [-s 是否当前页面打开]',
	desc: 'bilibili搜索引擎',
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
			key: 'user',
			desc: '是否搜索作者',
			alias: ['-u'],
			type: 'boolean',
			default: false,
		},
	],
}
