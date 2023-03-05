import { h, render } from 'vue'

import ModelService from 'core/modelService'
import PluginService from 'core/pluginService'
import { inject, injectable } from 'shared/utils/dependencyInject'
import { ee } from 'shared/utils/event'
import Symbols from 'dependency-type.config'

import { EditorPlugin } from 'extensions/type'
import type { App } from 'vue'

type VNode = ReturnType<typeof h>

@injectable()
class BoardService {

	@inject(Symbols.PluginService) pluginService!: PluginService
	@inject(Symbols.ModelService) modelService!: ModelService

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
