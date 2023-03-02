import { EditorPlugin } from 'extensions/type'
import { TYPES } from 'core/type'
import { inject, injectable } from 'common/utils/dependencyInject'
import PluginService from './pluginService'
import BoardService from './boardService'
import container from 'src/dependency-inject.config'

@injectable()
class JEditor {

	@inject(TYPES.PluginService) pluginService!: PluginService
	@inject(TYPES.BoardService) boardService!: BoardService

	public run(appContainer: string, plugins: EditorPlugin[]): void {
		this.pluginService.usePlugin(container.get(TYPES.Whiteboard))
		this.pluginService.usePlugins(plugins)
		this.pluginService.applyPlugins(appContainer)

		const boardPlugin = this.pluginService.pluginPool.get('Whiteboard')
		if (boardPlugin) {
			this.boardService.initBoard(boardPlugin, this.pluginService.app)
		}
	}

}

export default JEditor
