import { commandList } from '@/core/hint'
import { checkIsSystemCommand, parseExecuteCommand } from './executeUtil'

const jumpCommand = commandList.find(command => command.start === 'jump')

describe('>>> checkIsSystemCommand test', () => {
	const fn = jest.fn(checkIsSystemCommand)
	const parseExecuteFn = jest.fn(parseExecuteCommand)
	describe('>>> test one of system instruct: jump github', () => {
		it("*** test it's SystemCommand", () => {
			expect(fn('jump github', commandList)).toEqual({
				isSystemType: true,
				command: jumpCommand,
				commandBody: 'github',
			})
		})

		it('*** test systemCommand parseExecute return value', () => {
			expect(parseExecuteFn('jump github')).toEqual({
				isCorrect: true,
				startCommand: 'jump',
				fullCommand: 'jump github',
				commandBody: 'github',
				systemCommandInfo: jumpCommand,
			})
		})
	})

	describe('>>> test one of is not system instruct: cd /home/me', () => {
		it("*** test it isn't SystemCommand", () => {
			expect(fn('cd /home/jimmy', commandList)).toEqual({
				isSystemType: false,
				command: undefined,
				commandBody: undefined,
			})
		})

		it("*** test isn't systemCommand parseExecute return value", () => {
			expect(parseExecuteFn('cd /home/jimmy')).toEqual({
				isCorrect: false,
				startCommand: 'cd',
				fullCommand: 'cd /home/jimmy',
				commandBody: undefined,
				systemCommandInfo: undefined,
			})
		})
	})
})

export {}
