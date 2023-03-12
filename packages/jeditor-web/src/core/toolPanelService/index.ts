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
	modelService!: ModelService

	@inject(Symbols.EditorPluginService)
	editorPluginService!: EditorPluginService

	private toolPool: Map<symbol, VNode> = new Map()
	private toolPanelVNode!: VNode

	initPanel(app: App): void {
		this.useTools()
		this.renderPanel(app)
	}

	useTools(): void {
		const allPlugins = this.editorPluginService.getAllPlugins()

		for (const plugin of allPlugins) {
			const trigger = plugin.trigger

			if (trigger && !this.toolPool.has(plugin.type)) {
				this.toolPool.set(plugin.type, trigger)
			}
		}
	}

	renderPanel(app: App): void {
		const toolPanelContainer = document.getElementById('toolPanel-container')

		if (!toolPanelContainer) {
			throw new Error('render toolPanel failed!')
		} else {
			const toolPanelModel = this.modelService.createModel(
				Symbols.ToolPanel
			) as ToolPanelModel

			for (const tool of this.toolPool.values()) {
				toolPanelModel.tools.push(tool)
			}

			this.toolPanelVNode = createRenderVNode({
				view: ToolPanelView,
				model: toolPanelModel,
				app,
			})

			renderVNode(this.toolPanelVNode, toolPanelContainer)
		}
	}

}

export default ToolPanelService
