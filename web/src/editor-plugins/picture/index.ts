import View from './view'
import { injectable, inject } from 'inversify'
import { TYPES } from 'src/editor-kernel/type'
import { EditorPlugin } from '../type.ts'
import type JEditor from 'src/editor-kernel/editor.ts'
import type { Component } from 'vue'

@injectable()
class Picture implements EditorPlugin {
  @inject(TYPES.JEditor)
  editor!: JEditor
  type: string = 'Picture'
  view: Component = View
}

export default Picture
