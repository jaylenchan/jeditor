import { injectable } from 'shared/utils/dependencyInject'

import type { EditorPlugin } from 'extensions/type'
import type { App } from 'vue'

@injectable()
class PluginService {

	public pluginPool: Map<symbol, EditorPlugin> = new Map()

	public usePlugin(plugin: EditorPlugin): PluginService {
		if (!this.pluginPool.has(plugin.type)) {
			this.pluginPool.set(plugin.type, plugin)
		}

		return this
	}

	public usePlugins(plugins: EditorPlugin[]): PluginService {
		for (const plugin of plugins) {
			this.usePlugin(plugin)
		}

		return this
	}

	public applyPlugins(app: App): void {
		for (const plugin of this.pluginPool.values()) {
			app.component(plugin.type.toString(), plugin.view)
		}
	}

	public getPlugin(type: symbol): EditorPlugin | null {
		const plugin = this.pluginPool.get(type)

		if (plugin) return plugin

		return null
	}

}

export default PluginService
