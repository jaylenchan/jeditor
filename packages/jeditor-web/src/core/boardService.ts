import ModelService from 'core/modelService'
import PluginService from 'core/pluginService'
import { TYPES } from 'core/type'
import { inject, injectable } from 'common/utils/dependencyInject'
import { EditorPlugin } from 'extensions/type'
import { h, render } from 'vue'
import type { App } from 'vue'
import { ee } from 'common/utils/event'

type VNode = ReturnType<typeof h>

@injectable()
class BoardService {

	@inject(TYPES.PluginService) pluginService!: PluginService
	@inject(TYPES.ModelService) modelService!: ModelService

	private boardVNode!: VNode

	/** 初始化whiteboard */
	public initBoard(boardPlugin: EditorPlugin, app: App): void {
		const boardView = boardPlugin.view
		const board = document.getElementById('board')

		if (board) {
			const model = this.modelService.generateModel('Whiteboard')
			const boardVNode = h(boardView, { model })

			this.boardVNode = boardVNode
			this.boardVNode.appContext = app._context
			render(this.boardVNode, board)
		}
	}

	public addElement(type: string): void {
		const model = this.modelService.generateModel(type)
		const boardModel = this.modelService.getBoardModel()

		if (boardModel) {
			boardModel.elements.push(model)
			ee.emit('modelChange')
		}
	}

}

export default BoardService
