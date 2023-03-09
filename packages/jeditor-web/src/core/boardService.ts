import Symbols from 'settings/dependency-type.config'
import { inject, injectable } from 'shared/utils/dependencyInject'
import { ee } from 'shared/utils/event'
import { merge } from 'shared/utils/object'
import { createRenderVNode, renderVNode } from 'shared/utils/render'

import WhiteboardModel from './views/whiteboard/model'

import type EditorPluginService from 'core/editorPluginService'
import type ModelService from 'core/modelService'
import type { ElementModel, VNode } from 'shared/utils/type'
import type { App } from 'vue'
@injectable()
class BoardService {

	@inject(Symbols.ModelService) modelService!: ModelService
	@inject(Symbols.EditorPluginService) pluginService!: EditorPluginService

	private boardVNode!: VNode

	/** 初始化whiteboard */
	public initBoard(app: App): void {
		const boardPlugin = this.pluginService.getPlugin(Symbols.Whiteboard)
		if (!boardPlugin) throw new Error('can not init board, editor init failed!')

		const boardView = boardPlugin.view
		const boardContainer = document.getElementById('board-container')

		if (boardContainer) {
			const boardModel = this.modelService.createModel(Symbols.Whiteboard)

			this.boardVNode = createRenderVNode({
				view: boardView,
				model: boardModel,
				app,
			})

			renderVNode(this.boardVNode, boardContainer)
		}
	}

	public getBoardModel(): WhiteboardModel | null {
		const boardModel = this.modelService.getModel(
			Symbols.Whiteboard,
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
			ee.emit('modelChange')
		}
	}

	public updateElement<T>(newModel: ElementModel<T>): void {
		const oldModel = this.modelService.getModel(newModel.type, newModel.id)

		if (!oldModel) return

		newModel = merge(oldModel, newModel)

		const boardModel = this.getBoardModel()
		if (boardModel) {
			const index = boardModel.elements.findIndex(el => el.id === newModel.id)
			boardModel.elements[index] = newModel
			ee.emit('modelUpdate')
		}
	}

}

export default BoardService
