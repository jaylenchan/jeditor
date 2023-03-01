import { EditorPlugin } from '@/extensions/type'
import { h, render } from 'vue'
import type { App } from 'vue'

class BoardService {
	public initBoard(boardPlugin: EditorPlugin, app: App): void {
		const boardView = boardPlugin.view
		const board = document.getElementById('board')

		if (board) {
			const boardVNode = h(boardView)
			boardVNode.appContext = app._context
			render(boardVNode, board)
		}
	}
}

export default BoardService
