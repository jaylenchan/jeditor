#! /usr/bin/env node

import JEditorCli from '../cli'
import commands from '../commands'


const cli = new JEditorCli()

cli.run(commands)
