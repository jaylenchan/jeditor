import JEditor from 'core/editor'

import container from './dependency-inject.config'

import { TYPES } from 'core/type'

const editor = container.get<JEditor>(TYPES.JEditor)
editor.run('#app', [container.get(TYPES.Text)])
