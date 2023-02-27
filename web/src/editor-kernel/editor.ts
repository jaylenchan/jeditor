import { injectable } from 'inversify'
import { Mixin } from 'ts-mixer'
import PluginManager from './plugin-manager'

@injectable()
class JEditor extends Mixin(PluginManager) {
  constructor() {
    super()
  }

  run(): void {
    this.applyPlugins()
    this.app.mount('#app')
  }
}

export default JEditor
