import { createApp } from 'vue'

import container from 'settings/dependency-inject.config'
import Symbols from 'settings/dependency-type.config'
import plugins from 'settings/plugin.config'
import { inject, injectable } from 'shared/utils/dependencyInject'

import LayoutView from './render-views/layout'

import type EditorPluginService from './editor-plugin-service'
import type PropPanelService from './propPanel-service'
import type WhiteboardService from './whiteboard-service'
import type { App } from 'vue'

@injectable()
class JEditor {

	@inject(Symbols.EditorPluginService)
	editorPluginService!: EditorPluginService

	@inject(Symbols.WhiteboardService)
	whiteboardService!: WhiteboardService

	@inject(Symbols.PropPanelService)
	propPanelService!: PropPanelService

	public app: App = createApp(LayoutView)

	public run(appContainer: string): void {
		this.app.mount(appContainer)

		this.editorPluginService
			.usePlugin(container.get(Symbols.Whiteboard))
			.usePlugin(container.get(Symbols.PropPanel))
			.usePlugins(plugins())
			.applyPlugins(this.app)

		this.whiteboardService.initBoard(this.app)
		this.propPanelService.initPanel(this.app)
	}

}

export default JEditor
