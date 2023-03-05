import { createApp } from 'vue'

import { inject, injectable } from 'shared/utils/dependencyInject'
import container from 'dependency-inject.config'
import Symbols from 'dependency-type.config'

import BoardService from './boardService'
import PluginService from './pluginService'
import AppView from './views/app'

import { EditorPlugin } from 'extensions/type'
import type { App } from 'vue'

@injectable()
class JEditor {

	@inject(Symbols.PluginService) pluginService!: PluginService
	@inject(Symbols.BoardService) boardService!: BoardService

	public app: App = createApp(AppView)

	public run(appContainer: string, plugins: EditorPlugin[]): void {
		this.app.mount(appContainer)

		this.pluginService
			.usePlugin(container.get(Symbols.Whiteboard))
			.usePlugins(plugins)
			.applyPlugins(this.app)

		this.boardService.initBoard(this.app)
	}

}

export default JEditor
