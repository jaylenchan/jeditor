import create from './create'
import introduce from './introduce'

import type JEditorCli from '../cli'


export default [introduce, create]

export type Commands = Array<(cli: JEditorCli) => void>
