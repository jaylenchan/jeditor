import { EditorPlugin } from '@/editor-plugins/type'
import { h, render } from 'vue'

class BoardManager {
  initBoard(boardPlugin: EditorPlugin) {
    const boardView = boardPlugin.view
    const board = document.getElementById('board')
    if (board) {
      const boardVNode = h(boardView)
      render(boardVNode, board)
    }
  }
}

export default BoardManager
