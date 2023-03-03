import { injectable } from 'inversify'

import Model from './model'
import View from './view'
import { EditorPlugin } from '../type'

@injectable()
class Text implements EditorPlugin {

	type = 'Text'
	view = View
	model = Model

}

export default Text
