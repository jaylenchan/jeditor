import JEditor from 'core/editor'
import container from 'dependency-inject.config'
import Symbols from 'dependency-type.config'

const editor = container.get<JEditor>(Symbols.JEditor)

editor.run('#app', [container.get(Symbols.Text)])
