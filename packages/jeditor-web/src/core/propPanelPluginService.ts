import { injectable } from 'shared/utils/dependencyInject'

import type { PropPanelPlugin } from 'shared/utils/type'

@injectable()
class PropPanelPluginService {

	public pluginPool: Map<symbol, PropPanelPlugin> = new Map()

	public usePlugin(plugin: PropPanelPlugin): PropPanelPluginService {
		if (plugin) {
			this.pluginPool.set(plugin.type, plugin)
		}

		return this
	}

	public usePlugins(plugins: PropPanelPlugin[]): PropPanelPluginService {
		for (const plugin of plugins) {
			this.usePlugin(plugin)
		}

		return this
	}

	public getPlugin(type: symbol): PropPanelPlugin | null {
		const propPanelPlugin = this.pluginPool.get(type)

		if (propPanelPlugin) return propPanelPlugin

		return null
	}

	public getAllPlugins(): PropPanelPlugin[] {
		const allPlugins: PropPanelPlugin[] = []

		for (const plugin of this.pluginPool.values()) {
			allPlugins.push(plugin)
		}

		return allPlugins
	}

	public hasPlugin(type: symbol): boolean {
		return this.pluginPool.has(type)
	}

}

export default PropPanelPluginService
