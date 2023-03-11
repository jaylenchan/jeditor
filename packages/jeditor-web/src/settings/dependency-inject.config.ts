import BoardService from 'core/board-service'
import JEditor from 'core/editor'
import EditorPluginService from 'core/editor-plugin-service'
import ModelService from 'core/model-service'
import PropPanelPluginService from 'core/proppanel-plugin-service'
import PropPanelService from 'core/proppanel-service'
import ReactivityService from 'core/reactivity-service'
import PropPanel from 'core/views/propPanel'
import Whiteboard from 'core/views/whiteboard'
import { TextPlugin } from 'extensions/index'
import Symbols from 'settings/dependency-type.config'
import { container } from 'shared/utils/dependencyInject'

container
	.bind<EditorPluginService>(Symbols.EditorPluginService)
	.to(EditorPluginService)
	.inSingletonScope()

container
	.bind<BoardService>(Symbols.BoardService)
	.to(BoardService)
	.inSingletonScope()

container
	.bind<ReactivityService>(Symbols.ReactivityService)
	.to(ReactivityService)
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

container.bind<TextPlugin>(Symbols.Text).to(TextPlugin).inSingletonScope()

export default container
