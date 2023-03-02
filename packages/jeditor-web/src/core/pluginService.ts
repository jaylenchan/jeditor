import { EditorPlugin } from 'extensions/type'
import { createApp } from 'vue'
import type { App } from 'vue'
import AppView from './view'

class PluginService {

	protected pluginPool: Map<string, EditorPlugin> = new Map()
	protected app: App = createApp(AppView)

	/** 注册插件*/
	public usePlugin(plugin: EditorPlugin) {
		if (!this.pluginPool.has(plugin.type)) {
			this.pluginPool.set(plugin.type, plugin)
		}

		return this
	}

	/** 注册多个插件 */
	public usePlugins(plugins: EditorPlugin[]) {
		for (const plugin of plugins) {
			this.usePlugin(plugin)
		}

		return this
	}

	/** 应用所有插件 */
	protected applyPlugins(): void {
		for (const plugin of this.pluginPool.values()) {
			this.app.component(plugin.type, plugin.view)
		}
	}

}

export default PluginService
