import JEditor from 'core/editor'
import EditorPluginService from 'core/editorPluginService'
import ModelService from 'core/modelService'
import PropPanelPluginService from 'core/propPanelPluginService'
import PropPanelService from 'core/propPanelService'
import ReactivityService from 'core/reactivityService'
import PropPanel from 'core/renderViews/propPanel'
import ToolPanel from 'core/renderViews/toolPanel'
import Whiteboard from 'core/renderViews/whiteboard'
import ToolPanelService from 'core/toolPanelService'
import WhiteboardService from 'core/whiteboardService'
import { TextPlugin } from 'extensions/index'
import Symbols from 'settings/dependency-type.config'
import { container } from 'shared/utils/dependencyInject'

container
	.bind<WhiteboardService>(Symbols.WhiteboardService)
	.to(WhiteboardService)
	.inSingletonScope()

container
	.bind<EditorPluginService>(Symbols.EditorPluginService)
	.to(EditorPluginService)
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

container
	.bind<ToolPanelService>(Symbols.ToolPanelService)
	.to(ToolPanelService)
	.inSingletonScope()

container.bind<JEditor>(Symbols.JEditor).to(JEditor).inSingletonScope()

container.bind<Whiteboard>(Symbols.Whiteboard).to(Whiteboard).inSingletonScope()

container.bind<PropPanel>(Symbols.PropPanel).to(PropPanel).inSingletonScope()

container.bind<ToolPanel>(Symbols.ToolPanel).to(ToolPanel).inSingletonScope()

container.bind<TextPlugin>(Symbols.Text).to(TextPlugin).inSingletonScope()

export default container
