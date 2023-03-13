import container from 'settings/dependency-inject.config'
import Symbols from 'settings/dependency-type.config'

import type JEditor from 'core/editor'


const editor = container.get<JEditor>(Symbols.JEditor)

editor.run('#app')
