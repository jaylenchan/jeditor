import { injectableInherit } from 'common/utils/dependencyInject'
import PluginService from './pluginService'
import BoardService from './boardService'

interface JEditor extends PluginService, BoardService {}
@injectableInherit(PluginService, BoardService)
class JEditor {

	public run(): void {
		this.applyPlugins()

		this.app.mount('#app')

		const boardPlugin = this.pluginPool.get('Whiteboard')
		if (boardPlugin) {
			this.initBoard(boardPlugin, this.app)
		}
	}

}

export default JEditor
