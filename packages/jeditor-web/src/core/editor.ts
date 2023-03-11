import { createApp } from 'vue'

import container from 'settings/dependency-inject.config'
import Symbols from 'settings/dependency-type.config'
import plugins from 'settings/plugin.config'
import { inject, injectable } from 'shared/utils/dependencyInject'

import AppView from './views/app'

import type EditorPluginService from './editor-plugin-service'
import type PropPanelService from './proppanel-service'
import type BoardService from './whiteboard-service'
import type { App } from 'vue'

@injectable()
class JEditor {

	@inject(Symbols.EditorPluginService)
	pluginService!: EditorPluginService

	@inject(Symbols.BoardService)
	boardService!: BoardService

	@inject(Symbols.PropPanelService)
	propPanelService!: PropPanelService

	public app: App = createApp(AppView)

	public run(appContainer: string): void {
		this.app.mount(appContainer)

		this.pluginService
			.usePlugin(container.get(Symbols.Whiteboard))
			.usePlugin(container.get(Symbols.PropPanel))
			.usePlugins(plugins())
			.applyPlugins(this.app)

		this.boardService.initBoard(this.app)
		this.propPanelService.initPanel(this.app)
	}

}

export default JEditor
