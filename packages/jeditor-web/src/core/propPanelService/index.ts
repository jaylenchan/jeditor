import Symbols from 'settings/dependency-type.config'
import { injectable, inject } from 'shared/utils/dependencyInject'
import { createRenderVNode, renderVNode } from 'shared/utils/render'

import type EditorPluginService from '../editorPluginService'
import type PropPanelPluginService from '../propPanelPluginService'
import type ModelService from 'core/modelService'
import type {
	ReactiveElementModel,
	PropPanelClass,
	VNode,
} from 'shared/utils/type'
import type { App } from 'vue'


@injectable()
class PropPanelService {

	@inject(Symbols.ModelService)
	private _modelService!: ModelService

	@inject(Symbols.EditorPluginService)
	private _editorPluginService!: EditorPluginService

	@inject(Symbols.PropPanelPluginService)
	private _propPanelPluginService!: PropPanelPluginService

	private _propPanelVNode!: VNode

	public initPanel(app: App): void {
		this._useAllPanelPlugins()
		this._renderPanel(app)
	}

	public usePanel(type: symbol, initialModel: ReactiveElementModel): VNode[] {
		const pluginClass = this._propPanelPluginService.getPlugin(type)
		let panel: VNode[] = []

		if (pluginClass) {
			panel = new pluginClass(initialModel).getEditBlocks()
		}

		return panel
	}

	private _useAllPanelPlugins(): void {
		const allPanelConstructor = this._extractAllPanelConstructors()
		for (const [
			panelPluginType,
			panelPluginConstructor,
		] of allPanelConstructor) {
			if (!this._propPanelPluginService.hasPlugin(panelPluginType)) {
				this._propPanelPluginService.usePlugin(
					panelPluginType,
					panelPluginConstructor
				)
			}
		}
	}

	private _extractAllPanelConstructors(): [symbol, PropPanelClass][] {
		const allPanelConstructor: [symbol, PropPanelClass][] = []
		const allPlugins = this._editorPluginService.getAllPlugins()

		for (const plugin of allPlugins) {
			if (plugin.propPanel) {
				allPanelConstructor.push([plugin.type, plugin.propPanel])
			}
		}

		return allPanelConstructor
	}

	private _renderPanel(app: App): void {
		const propPanelPlugin = this._editorPluginService.getPlugin(
			Symbols.PropPanel
		)

		if (!propPanelPlugin)
			throw new Error('can not init propPanel, editor init failed!')

		const propPanelView = propPanelPlugin.view
		const propPanelContainer = document.getElementById('propPanel-container')

		if (propPanelContainer) {
			const propPanelModel = this._modelService.createModel(Symbols.PropPanel)

			this._propPanelVNode = createRenderVNode({
				view: propPanelView,
				model: propPanelModel,
				app,
			})

			renderVNode(this._propPanelVNode, propPanelContainer)
		}
	}

}

export default PropPanelService
