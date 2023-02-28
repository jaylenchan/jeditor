import { EditorPlugin } from '@/editor-plugins/type'
import { createApp } from 'vue'

class BoardManager {
  initBoard(boardPlugin: EditorPlugin) {
    const boardView = boardPlugin.view
    const boardApp = createApp(boardView)
    const board = document.getElementById('board')
    if (board) {
      boardApp.mount(board)
    }
  }
}

export default BoardManager
