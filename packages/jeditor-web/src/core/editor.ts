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
	private _editorPluginService!: EditorPluginService

	@inject(Symbols.WhiteboardService)
	private _whiteboardService!: WhiteboardService

	@inject(Symbols.PropPanelService)
	private _propPanelService!: PropPanelService

	@inject(Symbols.ToolPanelService)
	private _toolPanelService!: ToolPanelService

	private _app: App = createApp(LayoutView)

	public run(appContainer: string): void {
		this._app.mount(appContainer)

		this._editorPluginService
			.usePlugin(container.get(Symbols.Whiteboard))
			.usePlugin(container.get(Symbols.PropPanel))
			.usePlugin(container.get(Symbols.ToolPanel))
			.usePlugins(plugins())
			.applyPlugins(this._app)

		this._whiteboardService.initBoard(this._app)
		this._propPanelService.initPanel(this._app)
		this._toolPanelService.initPanel(this._app)
	}

}

export default JEditor
