import { nextTick } from 'vue'

import Symbols from 'settings/dependency-type.config'
import { injectable, inject } from 'shared/utils/dependencyInject'
import { createRenderVNode, renderVNode } from 'shared/utils/render'

import type EditorPluginService from '../editorPluginService'
import type PropPanelPluginService from '../propPanelPluginService'
import type PropPanelModel from '../renderViews/propPanel/model'
import type ModelService from 'core/modelService'
import type { ReactiveElementModel, VNode } from 'shared/utils/type'
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
		this._propPanelPluginService.usePlugins()
		this._propPanelPluginService.applyPlugins()
		this._renderPanel(app)
	}

	public usePanel(type: symbol, initialModel: ReactiveElementModel): void {
		const panelPlugin = this._propPanelPluginService.getPlugin(type)
		const editBlocks: VNode[] = []

		if (panelPlugin) {
			const curPanelEditBlockGenerators = panelPlugin
				.getEditBlockGenerators()
				.values()

			for (const editBlockGenerator of curPanelEditBlockGenerators) {
				editBlocks.push(editBlockGenerator(initialModel))
			}
		}

		const propPanelModel = this.getPropPanelModel()

		propPanelModel.editBlocks.length = 0
		nextTick(() => {
			propPanelModel.editBlocks.push(...editBlocks)
		})
	}

	public getPropPanelModel(): PropPanelModel {
		const propPanelModel = this._modelService.getModelById(
			Symbols.PropPanel.toString()
		)

		if (propPanelModel) {
			return propPanelModel as PropPanelModel
		} else {
			throw new Error(
				'can not found propPanelModel, please use `modelService` to create the proPanelModel!'
			)
		}
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
