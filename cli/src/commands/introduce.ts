import type JEditorCli from '../index'

const introduce = (cli: JEditorCli) => {
  cli
    .name('jeditor-cli')
    .description('CLI to some JEditor utilities')
    .version('0.0.1')
}

export default introduce
