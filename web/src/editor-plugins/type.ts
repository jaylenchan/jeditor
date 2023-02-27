import type JEditor from 'src/editor-kernel/editor'
import type { Component } from 'vue'

export interface EditorPlugin {
  type: string
  view: Component // Note:目前没找到一个完美类型能够标注所有由defineComponent定义出来的组件，现在使用的这个类型除了字面上标注，实际上类型已经不安全了，这就又得在运行时做功夫检查了
  editor: JEditor
}
