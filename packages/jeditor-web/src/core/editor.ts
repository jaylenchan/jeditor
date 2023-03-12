import { createApp } from 'vue'

import container from 'settings/dependency-inject.config'
import Symbols from 'settings/dependency-type.config'
import plugins from 'settings/plugin.config'
import { inject, injectable } from 'shared/utils/dependencyInject'

import LayoutView from './renderViews/layout'

import type EditorPluginService from './editorPluginService'
import type PropPanelService from './propPanelService'
import type ToolPanelService from './toolPanelService'
import type WhiteboardService from './whiteboardService'
import type { App } from 'vue'

@injectable()
class JEditor {

	@inject(Symbols.EditorPluginService)
	editorPluginService!: EditorPluginService

	@inject(Symbols.WhiteboardService)
	whiteboardService!: WhiteboardService

	@inject(Symbols.PropPanelService)
	propPanelService!: PropPanelService

	@inject(Symbols.ToolPanelService)
	toolPanelService!: ToolPanelService

	public app: App = createApp(LayoutView)

	public run(appContainer: string): void {
		this.app.mount(appContainer)

		this.editorPluginService
			.usePlugin(container.get(Symbols.Whiteboard))
			.usePlugin(container.get(Symbols.PropPanel))
			.usePlugin(container.get(Symbols.ToolPanel))
			.usePlugins(plugins())
			.applyPlugins(this.app)

		this.whiteboardService.initBoard(this.app)
		this.propPanelService.initPanel(this.app)
		this.toolPanelService.initPanel(this.app)
	}

}

export default JEditor
