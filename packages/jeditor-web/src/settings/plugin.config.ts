import container from 'settings/dependency-inject.config'
import Symbols from 'settings/dependency-type.config'

import { EditorPlugin } from 'shared/utils/type'

export default () => [container.get<EditorPlugin>(Symbols.Text)]
