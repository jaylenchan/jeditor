import Symbols from 'settings/dependency-type.config'
import { injectable, inject } from 'shared/utils/dependencyInject'
import { createRenderVNode, renderVNode } from 'shared/utils/render'

import type EditorPluginService from './editorPluginService'
import type PropPanelPluginService from './propPanelPluginService'
import type ModelService from 'core/modelService'
import type { PanelItem, PropPanelClass, VNode } from 'shared/utils/type'
import type { App } from 'vue'

@injectable()
class PropPanelService {

	@inject(Symbols.ModelService)
	modelService!: ModelService

	@inject(Symbols.EditorPluginService)
	editorPluginService!: EditorPluginService

	@inject(Symbols.PropPanelPluginService)
	propPanelPluginService!: PropPanelPluginService

	private propPanelVNode!: VNode

	public initPanel(app: App): void {
		this.useAllPanelPlugins()
		this.propPanelPluginService.applyPlugins()
		this.renderPanel(app)
	}

	public useAllPanelPlugins(): void {
		const allPanelConstructor = this.extractAllPanelConstructors()
		for (const [
			panelPluginType,
			panelPluginConstructor,
		] of allPanelConstructor) {
			if (!this.propPanelPluginService.hasPlugin(panelPluginType)) {
				this.propPanelPluginService.usePlugin(new panelPluginConstructor())
			}
		}
	}

	public extractAllPanelConstructors(): [symbol, PropPanelClass][] {
		const allPanelConstructor: [symbol, PropPanelClass][] = []
		const allPlugins = this.editorPluginService.getAllPlugins()

		for (const plugin of allPlugins) {
			if (plugin.propPanel) {
				allPanelConstructor.push([plugin.type, plugin.propPanel])
			}
		}

		return allPanelConstructor
	}

	public renderPanel(app: App): void {
		const propPanelPlugin = this.editorPluginService.getPlugin(
			Symbols.PropPanel
		)

		if (!propPanelPlugin)
			throw new Error('can not init propPanel, editor init failed!')

		const propPanelView = propPanelPlugin.view
		const propPanelContainer = document.getElementById('prop-panel-container')

		if (propPanelContainer) {
			const propPanelModel = this.modelService.createModel(Symbols.PropPanel)

			this.propPanelVNode = createRenderVNode({
				view: propPanelView,
				model: propPanelModel,
				app,
			})

			renderVNode(this.propPanelVNode, propPanelContainer)
		}
	}

	public getPanel(type: symbol): PanelItem[] {
		const panel = this.propPanelPluginService.getPlugin(type)
		const allPanelItems: PanelItem[] = []

		if (panel) {
			for (const panelItemSet of panel.components.values()) {
				for (const panelItem of panelItemSet) {
					allPanelItems.push(panelItem)
				}
			}
		}

		return allPanelItems
	}

}

export default PropPanelService
