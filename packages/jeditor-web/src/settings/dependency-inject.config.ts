import BoardService from 'core/boardService'
import JEditor from 'core/editor'
import ModelService from 'core/modelService'
import PluginService from 'core/pluginService'
import Whiteboard from 'core/views/whiteboard'
import { Text } from 'extensions/index'
import Symbols from 'settings/dependency-type.config'
import { container } from 'shared/utils/dependencyInject'

import type { EditorPlugin } from 'extensions/type'

container
	.bind<PluginService>(Symbols.PluginService)
	.to(PluginService)
	.inSingletonScope()
container
	.bind<BoardService>(Symbols.BoardService)
	.to(BoardService)
	.inSingletonScope()
container
	.bind<ModelService>(Symbols.ModelService)
	.to(ModelService)
	.inSingletonScope()

container.bind<JEditor>(Symbols.JEditor).to(JEditor).inSingletonScope()
container.bind<Whiteboard>(Symbols.Whiteboard).to(Whiteboard).inSingletonScope()
container.bind<EditorPlugin>(Symbols.Text).to(Text).inSingletonScope()

export default container
