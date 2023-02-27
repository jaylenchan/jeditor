import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './editor-kernel/type'
import JEditor from './editor-kernel/editor'
import { Picuture } from './editor-plugins'
import type { EditorPlugin } from './editor-plugins/type'

const container = new Container()
container.bind<JEditor>(TYPES.JEditor).to(JEditor).inSingletonScope()
container.bind<EditorPlugin>(TYPES.Picture).to(Picuture).inSingletonScope()

const editor = container.get<JEditor>(TYPES.JEditor)

editor.usePlugin(container.get(TYPES.Picture)).run()
