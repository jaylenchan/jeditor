import { createApp } from 'vue'

import container from 'settings/dependency-inject.config'
import Symbols from 'settings/dependency-type.config'
import plugins from 'settings/plugin.config'
import { inject, injectable } from 'shared/utils/dependencyInject'

import BoardService from './boardService'
import PluginService from './pluginService'
import AppView from './views/app'

import type { App } from 'vue'

@injectable()
class JEditor {

	@inject(Symbols.PluginService) pluginService!: PluginService
	@inject(Symbols.BoardService) boardService!: BoardService

	public app: App = createApp(AppView)

	public run(appContainer: string): void {
		this.app.mount(appContainer)

		this.pluginService
			.usePlugin(container.get(Symbols.Whiteboard))
			.usePlugins(plugins())
			.applyPlugins(this.app)

		this.boardService.initBoard(this.app)
	}

}

export default JEditor
