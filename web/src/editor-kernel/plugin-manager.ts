import { EditorPlugin } from '@/editor-plugins/type'
import { createApp } from 'vue'
import type { App } from 'vue'
import AppView from './view'

class PluginManager {
  protected pluginPool: Map<string, EditorPlugin> = new Map()
  protected app: App = createApp(AppView)

  usePlugin(plugin: EditorPlugin) {
    if (!this.pluginPool.has(plugin.type)) {
      this.pluginPool.set(plugin.type, plugin)
    }
    // console.warn(`<${plugin.id}>插件已存在，无需重复注册！`)
    return this
  }

  usePlugins(plugins: EditorPlugin[]) {
    for (const plugin of plugins) {
      this.usePlugin(plugin)
    }
    return this
  }

  protected applyPlugins(): void {
    for (const plugin of this.pluginPool.values()) {
      this.app.component(plugin.type, plugin.view)
    }
  }
}

export default PluginManager
