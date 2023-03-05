import { inject, injectable } from 'shared/utils/dependencyInject'
import container from 'dependency-inject.config'
import Symbols from 'dependency-type.config'

import BoardService from './boardService'
import PluginService from './pluginService'

import { EditorPlugin } from 'extensions/type'

@injectable()
class JEditor {

	@inject(Symbols.PluginService) pluginService!: PluginService
	@inject(Symbols.BoardService) boardService!: BoardService

	public run(appContainer: string, plugins: EditorPlugin[]): void {
		this.pluginService
			.usePlugin(container.get(Symbols.Whiteboard))
			.usePlugins(plugins)
			.applyPlugins(appContainer)

		const boardPlugin = this.pluginService.pluginPool.get('Whiteboard')
		if (boardPlugin) {
			this.boardService.initBoard(boardPlugin, this.pluginService.app)
		}
	}

}

export default JEditor
