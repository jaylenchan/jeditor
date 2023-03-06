import Symbols from 'settings/dependency-type.config'
import { inject, injectable } from 'shared/utils/dependencyInject'
import { ee } from 'shared/utils/event'
import { generateRenderVNode, renderVNode } from 'shared/utils/render'

import WhiteboardModel from './views/whiteboard/model'

import type EditorPluginService from 'core/editorPluginService'
import type ModelService from 'core/modelService'
import type { VNode } from 'shared/utils/type'
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
			const boardModel = this.modelService.generateModel(Symbols.Whiteboard)

			this.boardVNode = generateRenderVNode({
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
		const model = this.modelService.generateModel(type)
		const boardModel = this.getBoardModel()

		if (boardModel) {
			boardModel.elements.push(model)
			ee.emit('modelChange')
		}
	}

}

export default BoardService
