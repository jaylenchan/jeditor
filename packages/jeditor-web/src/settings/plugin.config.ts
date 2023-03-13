import container from 'settings/dependency-inject.config'
import Symbols from 'settings/dependency-type.config'

import type { EditorPlugin } from 'shared/utils/type'


export default (): EditorPlugin[] => [container.get<EditorPlugin>(Symbols.Text)]
