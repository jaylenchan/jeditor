import { Command } from 'commander'
import commands from './commands'
import type { Commands } from './commands'

class JEditorCli extends Command {
  constructor() {
    super()
  }

  useCommands(commands: Commands) {
    commands.forEach(cmd => {
      cmd(this)
    })
  }

  run(commands: Commands) {
    this.useCommands(commands)
    this.parse()
  }
}

export default JEditorCli

const cli = new JEditorCli()
cli.run(commands)
