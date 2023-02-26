import { createApp } from 'vue'
import App from './view'
import { EditorPluginTrait, EditorTrait, IPlugin, IEditor } from './type'
import { injectable } from 'inversify'

@injectable()
class JEditor implements EditorTrait, EditorPluginTrait {
  private pluginPool: Map<string, IPlugin> = new Map()
  private app: ReturnType<typeof createApp>

  constructor() {
    this.app = createApp(App)
  }

  usePlugin(plugin: IPlugin): IEditor {
    if (!this.pluginPool.has(plugin.id)) {
      this.pluginPool.set(plugin.id, plugin)
    }
    // console.warn(`<${plugin.id}>插件已存在，无需重复注册！`)
    return this
  }

  usePlugins(plugins: IPlugin[]): IEditor {
    for (const plugin of plugins) {
      this.usePlugin(plugin)
    }
    return this
  }

  applyPlugins(): void {
    console.log('加载所有插件！')
    for (const plugin of this.pluginPool.values()) {
      this.app.component(plugin.id, plugin.view)
    }
  }

  run(): void {
    this.applyPlugins()
    this.app.mount('#app')
  }
}

export default JEditor
