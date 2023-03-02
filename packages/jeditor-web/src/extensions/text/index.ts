import View from './view'
import { injectable } from 'inversify'
import { EditorPlugin } from '../type'
import Model from './model'

@injectable()
class Text implements EditorPlugin {

	type = 'Text'
	view = View
	model = Model

}

export default Text
