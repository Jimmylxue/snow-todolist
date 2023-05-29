import { searchPlatformList } from '@/hooks/const'

export function zhihuExecute(instruct: string) {
	const zhihuParams = {
		_: '',
		self: false,
		user: false,
	}
	if (
		instruct.trimStart().includes(' -u') &&
		instruct.trimEnd().endsWith(' -s')
	) {
		zhihuParams._ = instruct.split(' -u')[0].trimStart()
		zhihuParams.self = true
		zhihuParams.user = true
	} else if (instruct.trimStart().includes(' -u')) {
		zhihuParams._ = instruct.split(' -u')[0].trimStart()
		zhihuParams.user = true
	} else if (instruct.trimEnd().endsWith(' -s')) {
		zhihuParams._ = instruct.split(' -s')[0].trimStart()
		zhihuParams.self = true
	} else {
		zhihuParams._ = instruct.trimStart()
	}

	console.log('instruct--------', instruct)
	console.log('analyze-------------------↓', zhihuParams)
	console.log(
		`search ${zhihuParams._} -f ${zhihuParams.user} ${
			zhihuParams.self ? '-s' : ''
		}`
	)

	const searchTarget = searchPlatformList.find(
		platform => platform.key === (zhihuParams.user ? 'zhihuUser' : 'zhihu')
	)?.target

	window.open(
		`${searchTarget}${zhihuParams._.trim()}`,
		`${zhihuParams.self ? '_self' : searchTarget! + zhihuParams}`
	)
}

export const zhihuCommand = {
	start: 'zhihu',
	hint: 'zhihu <搜索内容> [-u 是否搜索作者] [-s 是否当前页面打开]',
	desc: '知乎搜索引擎',
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
