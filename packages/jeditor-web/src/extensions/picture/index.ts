import View from './view'
import { injectable, inject } from 'inversify'
import { TYPES } from 'core/type'
import { EditorPlugin } from '../type'
import type JEditor from 'core/editor'
import type { Component } from 'vue'

@injectable()
class Picture implements EditorPlugin {

	@inject(TYPES.JEditor)
	editor!: JEditor
	type = 'Picture'
	view: Component = View

}

export default Picture
