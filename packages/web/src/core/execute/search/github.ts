import { searchPlatformList } from '@/hooks/const'

export function githubExecute(instruct: string) {
	const githubParams = {
		_: '',
		self: false,
		user: false,
	}
	if (
		instruct.trimStart().includes(' -u') &&
		instruct.trimEnd().endsWith(' -s')
	) {
		githubParams._ = instruct.split(' -u')[0].trimStart()
		githubParams.self = true
		githubParams.user = true
	} else if (instruct.trimStart().includes(' -u')) {
		githubParams._ = instruct.split(' -u')[0].trimStart()
		githubParams.user = true
	} else if (instruct.trimEnd().endsWith(' -s')) {
		githubParams._ = instruct.split(' -s')[0].trimStart()
		githubParams.self = true
	} else {
		githubParams._ = instruct.trimStart()
	}

	console.log('instruct--------', instruct)
	console.log('analyze-------------------↓', githubParams)
	console.log(
		`search ${githubParams._} -f ${githubParams.user} ${
			githubParams.self ? '-s' : ''
		}`
	)

	const searchTarget = searchPlatformList.find(
		platform =>
			platform.key ===
			(githubParams.user || githubParams._.trim() === ''
				? 'githubUser'
				: 'github')
	)?.target

	window.open(
		`${searchTarget}${githubParams._.trim()}`,
		`${githubParams.self ? '_self' : searchTarget! + githubParams}`
	)
}

export const githubCommand = {
	start: 'github',
	hint: 'github <搜索内容> [-u 是否搜索作者] [-s 是否当前页面打开]',
	desc: '百度搜索引擎搜索',
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
			desc: '是否搜索作者~',
			alias: ['-u'],
			type: 'boolean',
			default: false,
		},
	],
}
