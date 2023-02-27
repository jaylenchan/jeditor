import JEditorCli from '..'
import introduce from './introduce'

export default [introduce]

export type Commands = Array<(cli: JEditorCli) => void>
