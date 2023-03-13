import Symbols from 'settings/dependency-type.config'
import { inject, injectable } from 'shared/utils/dependencyInject'
import { createRenderVNode, renderVNode } from 'shared/utils/render'

import type WhiteboardModel from '../renderViews/whiteboard/model'
import type EditorPluginService from 'core/editorPluginService'
import type ModelService from 'core/modelService'
import type { VNode } from 'shared/utils/type'
import type { App } from 'vue'


@injectable()
class WhiteboardService {

	@inject(Symbols.ModelService)
	private _modelService!: ModelService

	@inject(Symbols.EditorPluginService)
	private _editorPluginService!: EditorPluginService

	private _boardVNode!: VNode

	/** 初始化whiteboard */
	public initBoard(app: App): void {
		const boardPlugin = this._editorPluginService.getPlugin(Symbols.Whiteboard)
		if (!boardPlugin) throw new Error('can not init board, editor init failed!')

		const boardView = boardPlugin.view
		const whiteboardContainer = document.getElementById('whiteboard-container')

		if (whiteboardContainer) {
			const boardModel = this._modelService.createModel(Symbols.Whiteboard)
			this._boardVNode = createRenderVNode({
				view: boardView,
				model: boardModel,
				app,
			})

			renderVNode(this._boardVNode, whiteboardContainer)
		}
	}

	public getBoardModel(): WhiteboardModel | null {
		const boardModel = this._modelService.getModelById(
			Symbols.Whiteboard.toString()
		)

		if (boardModel) {
			return boardModel as WhiteboardModel
		}

		return null
	}

	public addElement(type: symbol): void {
		const model = this._modelService.createModel(type)
		const boardModel = this.getBoardModel()

		if (boardModel) {
			boardModel.elements.push(model)
		}
	}

}

export default WhiteboardService
