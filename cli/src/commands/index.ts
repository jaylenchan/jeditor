import type JEditorCli from '../cli'
import introduce from './introduce'
import create from './create'

export default [introduce, create]

export type Commands = Array<(cli: JEditorCli) => void>
