import type JEditorCli from '../cli'

const introduce = (cli: JEditorCli): void => {
	cli
		.name('jeditor-cli')
		.description('CLI to some JEditor utilities')
		.version('0.0.1')
}

export default introduce
