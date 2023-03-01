import { EditorPlugin } from '@/extensions/type'
import { createApp } from 'vue'
import type { App } from 'vue'
import AppView from './view'

class PluginService {

	protected pluginPool: Map<string, EditorPlugin> = new Map()
	protected app: App = createApp(AppView)

	public usePlugin(plugin: EditorPlugin) {
		if (!this.pluginPool.has(plugin.type)) {
			this.pluginPool.set(plugin.type, plugin)
		}

		return this
	}

	public usePlugins(plugins: EditorPlugin[]) {
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

export default PluginService
