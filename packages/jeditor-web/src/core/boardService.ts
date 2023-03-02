import PluginService from 'core/pluginService'
import { TYPES } from 'core/type'
import { inject, injectable } from 'common/utils/dependencyInject'
import { EditorPlugin } from 'extensions/type'
import { h, render } from 'vue'
import type { App } from 'vue'

@injectable()
class BoardService {

	@inject(TYPES.PluginService) pluginService!: PluginService

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

	public addElement(type: string) {
		console.log('element add', type)
		const plugin = this.pluginService.pluginPool.get(type)
		console.log('plugin', plugin)
	}

}

export default BoardService
