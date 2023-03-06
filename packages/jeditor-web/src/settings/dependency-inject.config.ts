import BoardService from 'core/boardService'
import JEditor from 'core/editor'
import EditorPluginService from 'core/editorPluginService'
import ModelService from 'core/modelService'
import PropPanelPluginService from 'core/propPanelPluginService'
import PropPanelService from 'core/propPanelService'
import PropPanel from 'core/views/propPanel'
import Whiteboard from 'core/views/whiteboard'
import { Text } from 'extensions/index'
import Symbols from 'settings/dependency-type.config'
import { container } from 'shared/utils/dependencyInject'

import type { EditorPlugin } from 'extensions/type'

container
	.bind<EditorPluginService>(Symbols.EditorPluginService)
	.to(EditorPluginService)
	.inSingletonScope()

container
	.bind<BoardService>(Symbols.BoardService)
	.to(BoardService)
	.inSingletonScope()

container
	.bind<ModelService>(Symbols.ModelService)
	.to(ModelService)
	.inSingletonScope()

container
	.bind<PropPanelPluginService>(Symbols.PropPanelPluginService)
	.to(PropPanelPluginService)
	.inSingletonScope()

container
	.bind<PropPanelService>(Symbols.PropPanelService)
	.to(PropPanelService)
	.inSingletonScope()

container.bind<JEditor>(Symbols.JEditor).to(JEditor).inSingletonScope()

container.bind<Whiteboard>(Symbols.Whiteboard).to(Whiteboard).inSingletonScope()

container.bind<PropPanel>(Symbols.PropPanel).to(PropPanel).inSingletonScope()

container.bind<EditorPlugin>(Symbols.Text).to(Text).inSingletonScope()

export default container
