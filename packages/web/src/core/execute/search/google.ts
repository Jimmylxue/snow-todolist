import { searchPlatformList } from '@/hooks/const'

export function googleExecute(instruct: string) {
	const googleParams = {
		_: '',
		self: false,
		photo: false,
	}
	if (
		instruct.trimStart().includes(' -s') &&
		instruct.trimEnd().endsWith(' -p')
	) {
		googleParams._ = instruct.split(' -s')[0]
		googleParams.self = true
		googleParams.photo = true
	} else if (instruct.trimStart().includes(' -s')) {
		googleParams._ = instruct.split(' -s')[0]
		googleParams.self = true
	} else if (instruct.trimEnd().endsWith(' -p')) {
		googleParams._ = instruct.split(' -p')[0]
		googleParams.photo = true
	} else {
		googleParams._ = instruct.trimStart()
	}
	console.log('instruct--------', instruct)
	console.log('analyze-------------------↓', googleParams)
	const googleTarget = searchPlatformList.find(
		plat => plat.key === (googleParams.photo ? 'googleImage' : 'google')
	)?.target
	window.open(
		`${googleTarget}${googleParams._}`,
		`${googleParams.self ? '_self' : googleTarget! + googleParams}`
	)
}

export const googleCommand = {
	start: 'google',
	hint: 'google <搜索内容> [-s 是否当前页面打开] [-p 是否搜索图片]',
	desc: '谷歌搜索引擎搜索',
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
			key: 'photo',
			desc: '是否搜索图片',
			alias: ['-p'],
			type: 'boolean',
			default: false,
		},
	],
}
