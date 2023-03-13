import { ContainerModule } from 'inversify'

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

import type { interfaces } from 'inversify'


const Editor = new ContainerModule((bind: interfaces.Bind) => {
	bind<JEditor>(Symbols.JEditor).to(JEditor).inSingletonScope()
})

const Services = new ContainerModule((bind: interfaces.Bind) => {
	bind<EditorPluginService>(Symbols.EditorPluginService)
		.to(EditorPluginService)
		.inSingletonScope()

	bind<WhiteboardService>(Symbols.WhiteboardService)
		.to(WhiteboardService)
		.inSingletonScope()

	bind<ReactivityService>(Symbols.ReactivityService)
		.to(ReactivityService)
		.inSingletonScope()

	bind<ModelService>(Symbols.ModelService).to(ModelService).inSingletonScope()

	bind<PropPanelPluginService>(Symbols.PropPanelPluginService)
		.to(PropPanelPluginService)
		.inSingletonScope()

	bind<PropPanelService>(Symbols.PropPanelService)
		.to(PropPanelService)
		.inSingletonScope()

	bind<ToolPanelService>(Symbols.ToolPanelService)
		.to(ToolPanelService)
		.inSingletonScope()
})

const BuiltInPlugins = new ContainerModule((bind: interfaces.Bind) => {
	bind<Whiteboard>(Symbols.Whiteboard).to(Whiteboard).inSingletonScope()

	bind<PropPanel>(Symbols.PropPanel).to(PropPanel).inSingletonScope()

	bind<ToolPanel>(Symbols.ToolPanel).to(ToolPanel).inSingletonScope()
})

const Extensions = new ContainerModule((bind: interfaces.Bind) => {
	bind<TextPlugin>(Symbols.Text).to(TextPlugin).inSingletonScope()
})

container.load(Editor)
container.load(Services)
container.load(BuiltInPlugins)
container.load(Extensions)

export default container
