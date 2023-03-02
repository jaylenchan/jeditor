import ModelService from 'core/modelService'
import PluginService from 'core/pluginService'
import { TYPES } from 'core/type'
import { inject, injectable } from 'common/utils/dependencyInject'
import { EditorPlugin } from 'extensions/type'
import { h, render } from 'vue'
import type { App } from 'vue'

@injectable()
class BoardService {

	@inject(TYPES.PluginService) pluginService!: PluginService
	@inject(TYPES.ModelService) modelService!: ModelService

	/** 初始化whiteboard */
	public initBoard(boardPlugin: EditorPlugin, app: App): void {
		const boardView = boardPlugin.view
		const board = document.getElementById('board')

		if (board) {
			const boardVNode = h(boardView)
			boardVNode.appContext = app._context
			render(boardVNode, board)
		}
	}

	public addElement(type: string): void {
		console.log('element add', type)
		this.modelService.generateModel(type)
	}

}

export default BoardService
