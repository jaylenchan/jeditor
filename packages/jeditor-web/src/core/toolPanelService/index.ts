import ToolPanelView from 'core/renderViews/toolPanel/view'
import Symbols from 'settings/dependency-type.config'
import { inject, injectable } from 'shared/utils/dependencyInject'
import { createRenderVNode, renderVNode } from 'shared/utils/render'

import type EditorPluginService from 'core/editorPluginService'
import type ModelService from 'core/modelService'
import type ToolPanelModel from 'core/renderViews/toolPanel/model'
import type { VNode } from 'shared/utils/type'
import type { App } from 'vue'


@injectable()
class ToolPanelService {

	@inject(Symbols.ModelService)
	private _modelService!: ModelService

	@inject(Symbols.EditorPluginService)
	private _editorPluginService!: EditorPluginService

	private _toolPool: Map<symbol, VNode> = new Map()
	private _toolPanelVNode!: VNode

	public initPanel(app: App): void {
		this._useTools()
		this._renderPanel(app)
	}

	private _useTools(): void {
		const allPlugins = this._editorPluginService.getAllPlugins()

		for (const plugin of allPlugins) {
			const trigger = plugin.trigger

			if (trigger && !this._toolPool.has(plugin.type)) {
				this._toolPool.set(plugin.type, trigger)
			}
		}
	}

	private _renderPanel(app: App): void {
		const toolPanelContainer = document.getElementById('toolPanel-container')

		if (!toolPanelContainer) {
			throw new Error('render toolPanel failed!')
		} else {
			const toolPanelModel = this._modelService.createModel(
				Symbols.ToolPanel
			) as ToolPanelModel

			for (const tool of this._toolPool.values()) {
				toolPanelModel.tools.push(tool)
			}

			this._toolPanelVNode = createRenderVNode({
				view: ToolPanelView,
				model: toolPanelModel,
				app,
			})

			renderVNode(this._toolPanelVNode, toolPanelContainer)
		}
	}

}

export default ToolPanelService
