import Symbols from 'settings/dependency-type.config'
import { inject, injectable } from 'shared/utils/dependencyInject'

import type EditorPluginService from 'core/editorPluginService'
import type { PropPanelClass } from 'shared/utils/type'


@injectable()
class PropPanelPluginService {

	@inject(Symbols.EditorPluginService)
	private _editorPluginService!: EditorPluginService

	private _pluginClassPool: Map<symbol, PropPanelClass> = new Map()
	private _pluginInstancePool: Map<symbol, InstanceType<PropPanelClass>> =
		new Map()

	public usePlugins(): void {
		const allPanelPluginsClasses = this._extractAllPanelPluginClasses()

		for (const [type, panelPluginClass] of allPanelPluginsClasses) {
			if (!this.hasPlugin(type)) {
				this._usePlugin(type, panelPluginClass)
			}
		}
	}

	public applyPlugins(): void {
		for (const [type, pluginClass] of this._pluginClassPool) {
			if (!this._pluginInstancePool.has(type)) {
				const pluginInstance = new pluginClass()
				this._pluginInstancePool.set(type, pluginInstance)
			}
		}
	}

	public getPlugin(type: symbol): InstanceType<PropPanelClass> | null {
		const propPanelInstance = this._pluginInstancePool.get(type)

		if (propPanelInstance) return propPanelInstance

		return null
	}

	public getAllPlugins(): InstanceType<PropPanelClass>[] {
		const allPlugins: InstanceType<PropPanelClass>[] = []

		for (const plugin of this._pluginInstancePool.values()) {
			allPlugins.push(plugin)
		}

		return allPlugins
	}

	public hasPlugin(type: symbol): boolean {
		return this._pluginInstancePool.has(type)
	}

	private _usePlugin(
		type: symbol,
		plugin: PropPanelClass
	): PropPanelPluginService {
		if (plugin) {
			this._pluginClassPool.set(type, plugin)
		}

		return this
	}

	private _extractAllPanelPluginClasses(): [symbol, PropPanelClass][] {
		const allPanelPluginsClasses: [symbol, PropPanelClass][] = []
		const allPlugins = this._editorPluginService.getAllPlugins()

		for (const plugin of allPlugins) {
			if (plugin.propPanel) {
				allPanelPluginsClasses.push([plugin.type, plugin.propPanel])
			}
		}

		return allPanelPluginsClasses
	}

}

export default PropPanelPluginService
