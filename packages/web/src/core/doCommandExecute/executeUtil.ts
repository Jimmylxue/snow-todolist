import { TSystemCommandType } from '@/core/hint'
import { commandList } from '@/core/hint'

type TCommand = {
	isCorrect: boolean
	fullCommand: string
	startCommand?: string // 起始命令
	commandBody?: string // 命令体
	systemCommandInfo?: TSystemCommandType
}

export function getStartCommand(instruct: string): string {
	return instruct.split(' ')[0]
}

type TCSystemCommand = {
	isSystemType: boolean
	command?: TSystemCommandType
	commandBody?: string
}

export function checkIsSystemCommand(
	instruct: string,
	systemCommandList: TSystemCommandType[]
): TCSystemCommand {
	const startCommand = getStartCommand(instruct)
	const commandItem = systemCommandList.find(
		command =>
			command.start === startCommand ||
			command.shortStart?.includes(startCommand)
	)

	const isSystemType = !!commandItem
	const commandBody = isSystemType
		? instruct.split(`${startCommand} `)[1]
		: void 0

	return { isSystemType, command: commandItem, commandBody }
}

export function parseExecuteCommand(instruct: string): TCommand {
	const startCommand = getStartCommand(instruct)
	const { isSystemType, command, commandBody } = checkIsSystemCommand(
		instruct,
		commandList
	)

	return {
		isCorrect: isSystemType,
		startCommand,
		fullCommand: instruct,
		commandBody,
		systemCommandInfo: command,
	}
}
