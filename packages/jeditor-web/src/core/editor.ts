import { decorate, injectable } from 'inversify'
import { Mixin } from 'ts-mixer'
import PluginManager from './pluginManager'
import BoardManager from './boardManager'

decorate(injectable(), PluginManager)
decorate(injectable(), BoardManager)
const Parent = Mixin(PluginManager, BoardManager)
decorate(injectable(), Parent)
@injectable()
class JEditor extends Parent {
  constructor() {
    super()
  }

  run(): void {
    this.applyPlugins()
    this.app.mount('#app')
    const boardPlugin = this.pluginPool.get('Whiteboard')
    if (boardPlugin) {
      this.initBoard(boardPlugin, this.app)
    }
  }
}

export default JEditor
