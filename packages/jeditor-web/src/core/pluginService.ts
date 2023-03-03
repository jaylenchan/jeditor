import { createApp } from 'vue'

import { injectable } from 'common/utils/dependencyInject'

import AppView from './views/app'

import type { EditorPlugin } from 'extensions/type'
import type { App } from 'vue'

@injectable()
class PluginService {

	public pluginPool: Map<string, EditorPlugin> = new Map()
	public app: App = createApp(AppView)

	/** 注册插件*/
	public usePlugin(plugin: EditorPlugin): PluginService {
		if (!this.pluginPool.has(plugin.type)) {
			this.pluginPool.set(plugin.type, plugin)
		}

		return this
	}

	/** 注册多个插件 */
	public usePlugins(plugins: EditorPlugin[]): PluginService {
		for (const plugin of plugins) {
			this.usePlugin(plugin)
		}

		return this
	}

	/** 应用所有插件 */
	public applyPlugins(appContainer: string): void {
		this.app.mount(appContainer)

		for (const plugin of this.pluginPool.values()) {
			this.app.component(plugin.type, plugin.view)
		}
	}

}

export default PluginService
