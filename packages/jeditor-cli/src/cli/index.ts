import { Command } from 'commander'
import type { Commands } from '../commands'

class JEditorCli extends Command {
	constructor() {
		super()
	}

	public useCommands(commands: Commands) {
		commands.forEach(cmd => {
			cmd(this)
		})
	}

	public run(commands: Commands) {
		this.useCommands(commands)
		this.parse()
	}
}

export default JEditorCli
