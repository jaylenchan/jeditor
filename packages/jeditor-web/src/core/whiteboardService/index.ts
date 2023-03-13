import Symbols from 'settings/dependency-type.config'
import { inject, injectable } from 'shared/utils/dependencyInject'
import { merge } from 'shared/utils/object'
import { createRenderVNode, renderVNode } from 'shared/utils/render'

import type WhiteboardModel from '../renderViews/whiteboard/model'
import type EditorPluginService from 'core/editorPluginService'
import type ModelService from 'core/modelService'
import type { ReactiveElementModel, VNode } from 'shared/utils/type'
import type { App } from 'vue'


@injectable()
class WhiteboardService {

	@inject(Symbols.ModelService)
	public modelService!: ModelService

	@inject(Symbols.EditorPluginService)
	public editorPluginService!: EditorPluginService

	private boardVNode!: VNode

	/** 初始化whiteboard */
	public initBoard(app: App): void {
		const boardPlugin = this.editorPluginService.getPlugin(Symbols.Whiteboard)
		if (!boardPlugin) throw new Error('can not init board, editor init failed!')

		const boardView = boardPlugin.view
		const whiteboardContainer = document.getElementById('whiteboard-container')

		if (whiteboardContainer) {
			const boardModel = this.modelService.createModel(Symbols.Whiteboard)
			this.boardVNode = createRenderVNode({
				view: boardView,
				model: boardModel,
				app,
			})

			renderVNode(this.boardVNode, whiteboardContainer)
		}
	}

	public getBoardModel(): WhiteboardModel | null {
		const boardModel = this.modelService.getModelById(
			Symbols.Whiteboard.toString()
		)

		if (boardModel) {
			return boardModel as WhiteboardModel
		}

		return null
	}

	public addElement(type: symbol): void {
		const model = this.modelService.createModel(type)
		const boardModel = this.getBoardModel()

		if (boardModel) {
			boardModel.elements.push(model)
		}
	}

	public updateElement(newModel: ReactiveElementModel): void {
		const oldModel = this.modelService.getModelById(newModel.id)

		if (!oldModel) return

		newModel = merge(oldModel, newModel)

		const boardModel = this.getBoardModel()
		if (boardModel) {
			const index = boardModel.elements.findIndex(el => el.id === newModel.id)
			boardModel.elements[index] = newModel
		}
	}

}

export default WhiteboardService
