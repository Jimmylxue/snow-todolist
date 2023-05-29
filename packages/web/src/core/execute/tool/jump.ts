import { TSnowTerminal } from '@/types/TSnowTerminal'
import { gotoExecute } from '../search/goto'

export async function jumpExecute(
	instruct: string,
	terminal: TSnowTerminal,
	fullInstruct: string
) {
	let gotoParams = {
		isSet: false,
		self: false,
		name: '',
		url: '',
	}

	if (instruct.includes('set ') && !instruct.includes(' -s')) {
		// is set jump
		gotoParams.isSet = true
		if (
			instruct.includes(' -n ') &&
			instruct.split(' -n ')[1]?.includes(' -l ')
		) {
			gotoParams.name = instruct.split(' -n ')[1]?.split(' -l ')[0]?.trim()
			gotoParams.url = instruct.split(' -l ')[1].trim()
			terminal.setJumpList('ADD', {
				name: gotoParams.name,
				url: gotoParams.url,
			})
			terminal.showSuccess('添加成功', fullInstruct)
		} else {
			terminal.showError(
				'添加失败 demo: jump set -n blog -l http://www.jimmyxuexue.top:999/',
				`${fullInstruct}`
			)
			console.log('instruct error')
		}
	} else {

		const name = instruct.includes(' -s')
			? instruct?.split(' -s')[0].trim()
			: instruct?.trim()
		const baseConfig = terminal.getStoreValue('baseConfig')
		const jumpList = baseConfig?.jumpList || []
		const findItem = jumpList.find(
			(jump: { name: string; url: string }) => jump.name === name
		)
		if (findItem) {
			gotoExecute(`${findItem.url} ${instruct.includes(' -s') ? '-s' : ''}`)
			terminal.addInstructRecord({ type: 'INSTRUCT', instruct: fullInstruct })
		} else {
			console.log('无映射关系', fullInstruct, '111', name, '111', instruct)
			terminal.showError('暂无映射关系', fullInstruct)
		}
	}
}

export const jumpCommand = {
	start: 'jump',
	shortStart: ['j', 'ju'],
	hint: 'jump <目标名称> [-s 是否当前页面打开]  ;\n   jump set -n <跳转名> -l <跳转链接>',
	desc: '快速跳转至收藏的网站',
	params: [
		{
			key: 'word',
			desc: '收藏网页名称',
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
			key: 'link',
			desc: '网页链接地址',
			alias: ['-l'],
			type: 'string',
			default: '',
		},
		{
			key: 'name',
			desc: '网页名称',
			alias: ['-n'],
			type: 'string',
			default: '',
		},
	],
}
