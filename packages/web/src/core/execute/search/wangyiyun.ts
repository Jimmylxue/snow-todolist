import { searchPlatformList } from '@/hooks/const'

export function wangYiYunExecute(instruct: string) {
	const wangyiyunParams = {
		_: '',
		self: false,
		user: false,
	}
	if (
		instruct.trimStart().includes(' -u') &&
		instruct.trimEnd().endsWith(' -s')
	) {
		wangyiyunParams._ = instruct.split(' -u')[0].trimStart()
		wangyiyunParams.self = true
		wangyiyunParams.user = true
	} else if (instruct.trimStart().includes(' -u')) {
		wangyiyunParams._ = instruct.split(' -u')[0].trimStart()
		wangyiyunParams.user = true
	} else if (instruct.trimEnd().endsWith(' -s')) {
		wangyiyunParams._ = instruct.split(' -s')[0].trimStart()
		wangyiyunParams.self = true
	} else {
		wangyiyunParams._ = instruct.trimStart()
	}

	console.log('instruct--------', instruct)
	console.log('analyze-------------------↓', wangyiyunParams)
	console.log(
		`search ${wangyiyunParams._} -f ${wangyiyunParams.user} ${
			wangyiyunParams.self ? '-s' : ''
		}`
	)

	const searchTarget = searchPlatformList.find(
		platform =>
			platform.key === (wangyiyunParams.user ? 'wangyiyunUser' : 'wangyiyun')
	)?.target

	window.open(
		`${searchTarget}${wangyiyunParams._.trim()}`,
		`${wangyiyunParams.self ? '_self' : searchTarget! + wangyiyunParams}`
	)
}

export const wangYiYunCommand = {
	start: 'wangyiyun',
	hint: 'wangyiyun <搜索内容> [-u 是否搜索歌手] [-s 是否当前页面打开]',
	desc: '网易云音乐搜索引擎',
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
