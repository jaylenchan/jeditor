import 'reflect-metadata'
import JEditor from 'core/editor'
import { TYPES } from 'core/type'
import container from './dependency-inject.config'

const editor = container.get<JEditor>(TYPES.JEditor)
editor.run('#app', [container.get(TYPES.Text)])
