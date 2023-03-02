import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './core/type'
import JEditor from './core/editor'
import { Picuture, Text, Whiteboard } from './extensions'
import type { EditorPlugin } from './extensions/type'

const container = new Container()
container.bind<JEditor>(TYPES.JEditor).to(JEditor).inSingletonScope()
container.bind<EditorPlugin>(TYPES.Whiteboard).to(Whiteboard).inSingletonScope()
container.bind<EditorPlugin>(TYPES.Picture).to(Picuture).inSingletonScope()
container.bind<EditorPlugin>(TYPES.Text).to(Text).inSingletonScope()

const editor = container.get<JEditor>(TYPES.JEditor)

editor
	.usePlugin(container.get(TYPES.Whiteboard))
	.usePlugin(container.get(TYPES.Picture))
	.usePlugin(container.get(TYPES.Text))
	.run('#app')
