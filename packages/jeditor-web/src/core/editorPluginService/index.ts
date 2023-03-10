import { injectable } from 'shared/utils/dependencyInject'

import type { EditorPlugin } from 'shared/utils/type'
import type { App } from 'vue'


@injectable()
class EditorPluginService {

	private _pluginPool: Map<symbol, EditorPlugin> = new Map()

	public usePlugin(plugin: EditorPlugin): EditorPluginService {
		if (!this._pluginPool.has(plugin.type)) {
			this._pluginPool.set(plugin.type, plugin)
		}

		return this
	}

	public usePlugins(plugins: EditorPlugin[]): EditorPluginService {
		for (const plugin of plugins) {
			this.usePlugin(plugin)
		}

		return this
	}

	public applyPlugins(app: App): void {
		for (const plugin of this._pluginPool.values()) {
			app.component(plugin.type.toString(), plugin.view)
		}
	}

	public getPlugin(type: symbol): EditorPlugin | null {
		const plugin = this._pluginPool.get(type)

		if (plugin) return plugin

		return null
	}

	public getAllPlugins(): EditorPlugin[] {
		const allPlugins: EditorPlugin[] = []

		for (const plugin of this._pluginPool.values()) {
			allPlugins.push(plugin)
		}

		return allPlugins
	}

	public hasPlugin(type: symbol): boolean {
		return this._pluginPool.has(type)
	}

}

export default EditorPluginService
