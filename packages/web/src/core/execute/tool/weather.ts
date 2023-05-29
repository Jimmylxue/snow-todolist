import { get } from '@/api/index'
import { TSnowTerminal } from '@/types/TSnowTerminal'
import { TWeatherInfo } from '@/types/TWeather'

export async function weatherExecute(
	instruct: string,
	terminal: TSnowTerminal,
	fullInstruct: string
) {
	const location = localStorage.getItem('snowIndex-location')
	if (!location) {
		terminal.showError(`获取地址失败，请尝试刷新浏览器`, fullInstruct)
		return
	}
	console.log(location)
	const res = await get<TWeatherInfo>(
		`weather/base?cityName=${
			instruct?.trim() || JSON.parse(location).city.replace(/市/g, '')
		}`
	)
	terminal.addInstructRecord({
		type: 'WEATHER',
		instruct: fullInstruct,
		result: res.result,
	})
}

export const weatherCommand = {
	start: 'weather',
	hint: 'weather [城市名称（不填则查询定位城市）]',
	desc: '查询天气',
	params: [
		{
			key: 'word',
			desc: '城市名称',
			isRequire: false, // 是否必填
		},
	],
}
