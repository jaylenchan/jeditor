import { Container } from 'common/utils/dependencyInject'
import BoardService from 'core/boardService'
import JEditor from 'core/editor'
import ModelService from 'core/modelService'
import PluginService from 'core/pluginService'
import Whiteboard from 'core/views/whiteboard'
import { Text } from 'extensions/index'

import { TYPES } from 'core/type'
import type { EditorPlugin } from 'extensions/type'

const container = new Container()

container
	.bind<PluginService>(TYPES.PluginService)
	.to(PluginService)
	.inSingletonScope()
container
	.bind<BoardService>(TYPES.BoardService)
	.to(BoardService)
	.inSingletonScope()
container
	.bind<ModelService>(TYPES.ModelService)
	.to(ModelService)
	.inSingletonScope()

container.bind<JEditor>(TYPES.JEditor).to(JEditor).inSingletonScope()
container.bind<Whiteboard>(TYPES.Whiteboard).to(Whiteboard).inSingletonScope()
container.bind<EditorPlugin>(TYPES.Text).to(Text).inSingletonScope()

export default container
