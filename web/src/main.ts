import 'reflect-metadata'
import { Container } from 'inversify'
import { IEditor, IPlugin, TYPES } from './editor-kernel/type'
import JEditor from './editor-kernel/editor'
import { Picuture } from './editor-plugins'

const container = new Container()
container.bind<IEditor>(TYPES.JEditor).to(JEditor).inSingletonScope()
container.bind<IPlugin>(TYPES.Picture).to(Picuture).inSingletonScope()
// container.bind<IPlugin>(TYPES.Text).to(Text).inSingletonScope()
// container.bind<IPlugin>(TYPES.Topic).to(Topic).inSingletonScope()
// container.bind<IPlugin>(TYPES.Table).to(Table).inSingletonScope()

const editor = container.get<IEditor>(TYPES.JEditor)

editor
  .usePlugin(container.get(TYPES.Picture))
  // .usePlugin(container.get('Text'))
  // .usePlugin(container.get('Topic'))
  // .usePlugin(container.get('Table'))
  .run()
