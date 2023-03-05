import { h, render } from 'vue'

import ModelService from 'core/modelService'
import PluginService from 'core/pluginService'
import { inject, injectable } from 'shared/utils/dependencyInject'
import { ee } from 'shared/utils/event'
import Symbols from 'dependency-type.config'

import WhiteboardModel from './views/whiteboard/model'

import type { App } from 'vue'

type VNode = ReturnType<typeof h>

@injectable()
class BoardService {

	@inject(Symbols.PluginService) pluginService!: PluginService
	@inject(Symbols.ModelService) modelService!: ModelService

	private boardVNode!: VNode

	/** 初始化whiteboard */
	public initBoard(app: App): void {
		const boardPlugin = this.pluginService.getPlugin(Symbols.Whiteboard)
		if (!boardPlugin) throw new Error('can not init board, editor init failed!')

		const boardView = boardPlugin.view
		const board = document.getElementById('board')

		if (board) {
			const model = this.modelService.generateModel(Symbols.Whiteboard)
			const boardVNode = h(boardView, { model })

			this.boardVNode = boardVNode
			this.boardVNode.appContext = app._context
			render(this.boardVNode, board)
		}
	}

	public getBoardModel(): WhiteboardModel | null {
		const ids = this.modelService.getModelIds(Symbols.Whiteboard)

		if (ids) {
			const whiteboardModel = this.modelService.getModel(
				Symbols.Whiteboard,
				ids[0]
			)
			return whiteboardModel as WhiteboardModel
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
