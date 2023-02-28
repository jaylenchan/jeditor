import View from './view'
import { injectable, inject } from 'inversify'
import { TYPES } from '@/editor-kernel/type'
import { EditorPlugin } from '../type'
import type JEditor from '@/editor-kernel/editor'
import type { Component } from 'vue'

@injectable()
class Picture implements EditorPlugin {
  @inject(TYPES.JEditor)
  editor!: JEditor
  type: string = 'Picture'
  view: Component = View
}

export default Picture
