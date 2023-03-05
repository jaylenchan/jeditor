import JEditor from 'core/editor'
import container from 'settings/dependency-inject.config'
import Symbols from 'settings/dependency-type.config'

const editor = container.get<JEditor>(Symbols.JEditor)

editor.run('#app')
