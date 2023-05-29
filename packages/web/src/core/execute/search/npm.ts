import { searchPlatformList } from '@/hooks/const'

export function npmExecute(instruct: string, fullStruct: string) {
	const npmParams = {
		_: '',
		self: false,
	}
	if (instruct.trimEnd().endsWith(' -s')) {
		npmParams._ = instruct.split(' -s')[0].trimStart()
		npmParams.self = true
	} else {
		npmParams._ = instruct.trimStart()
	}

	console.log('instruct--------', instruct)
	console.log('analyze-------------------↓', npmParams)
	console.log(`search ${npmParams._} -f  ${npmParams.self ? '-s' : ''}`)

	const searchTarget = searchPlatformList.find(
		platform => platform.key === 'npm'
	)?.target

	window.open(
		`${searchTarget}${npmParams._.trim()}`,
		`${npmParams.self ? '_self' : searchTarget! + npmParams}`
	)
}

export const npmCommand = {
	start: 'npm',
	hint: 'npm <搜索内容> [-s 是否当前页面打开]',
	desc: 'npm 搜索引擎',
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
	],
}
