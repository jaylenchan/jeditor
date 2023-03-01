import { decorate, injectable } from 'inversify'
import { Mixin } from 'ts-mixer'
import PluginService from './pluginService'
import BoardService from './boardService'

decorate(injectable(), PluginService)
decorate(injectable(), BoardService)
const Parent = Mixin(PluginService, BoardService)
decorate(injectable(), Parent)
@injectable()
class JEditor extends Parent {
	constructor() {
		super()
	}

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
