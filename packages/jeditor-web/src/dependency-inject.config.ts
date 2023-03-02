import { Container } from 'common/utils/dependencyInject'
import JEditor from 'core/editor'
import { TYPES } from 'core/type'
import PluginService from 'core/pluginService'
import BoardService from 'core/boardService'
import { Text } from 'extensions/index'
import type { EditorPlugin } from 'extensions/type'
import Whiteboard from 'core/views/whiteboard'

const container = new Container()

container
	.bind<PluginService>(TYPES.PluginService)
	.to(PluginService)
	.inSingletonScope()
container
	.bind<BoardService>(TYPES.BoardService)
	.to(BoardService)
	.inSingletonScope()
container.bind<JEditor>(TYPES.JEditor).to(JEditor).inSingletonScope()
container.bind<Whiteboard>(TYPES.Whiteboard).to(Whiteboard).inSingletonScope()
container.bind<EditorPlugin>(TYPES.Text).to(Text).inSingletonScope()

export default container
