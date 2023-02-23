import { createApp } from 'vue'
import './view/style.css'
import App from './view/App.vue'
import { EditorPluginTrait, EditorTrait, IPlugin, IEditor } from './type'
import { injectable } from 'inversify'

@injectable()
class JEditor implements EditorTrait, EditorPluginTrait {
  private pluginPool: Map<string, IPlugin> = new Map()

  usePlugin(plugin: IPlugin): IEditor {
    if (!this.pluginPool.has(plugin.pluginName)) {
      this.pluginPool.set(plugin.pluginName, plugin)
    }
    // console.warn(`<${plugin.pluginName}>插件已存在，无需重复注册！`)
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
      console.log(plugin)
    }
  }

  run(): void {
    this.applyPlugins()
    createApp(App).mount('#app')
  }
}

export default JEditor
