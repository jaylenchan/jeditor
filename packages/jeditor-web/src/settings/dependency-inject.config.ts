import JEditor from 'core/editor'
import EditorPluginService from 'core/editor-plugin-service'
import ModelService from 'core/model-service'
import PropPanelPluginService from 'core/propPanel-plugin-service'
import PropPanelService from 'core/propPanel-service'
import ReactivityService from 'core/reactivity-service'
import PropPanel from 'core/render-views/propPanel'
import Whiteboard from 'core/render-views/whiteboard'
import WhiteboardService from 'core/whiteboard-service'
import { TextPlugin } from 'extensions/index'
import Symbols from 'settings/dependency-type.config'
import { container } from 'shared/utils/dependencyInject'

container
	.bind<EditorPluginService>(Symbols.EditorPluginService)
	.to(EditorPluginService)
	.inSingletonScope()

container
	.bind<WhiteboardService>(Symbols.WhiteboardService)
	.to(WhiteboardService)
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
