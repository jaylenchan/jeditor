import { injectable } from 'shared/utils/dependencyInject'

import type { PropPanelClass } from 'shared/utils/type'


@injectable()
class PropPanelPluginService {

	public pluginPool: Map<symbol, PropPanelClass> = new Map()

	public usePlugin(
		type: symbol,
		plugin: PropPanelClass
	): PropPanelPluginService {
		if (plugin) {
			this.pluginPool.set(type, plugin)
		}

		return this
	}

	public getPlugin(type: symbol): PropPanelClass | null {
		const propPanelClass = this.pluginPool.get(type)

		if (propPanelClass) return propPanelClass

		return null
	}

	public getAllPlugins(): PropPanelClass[] {
		const allPlugins: PropPanelClass[] = []

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
