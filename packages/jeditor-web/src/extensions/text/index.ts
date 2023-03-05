import { injectable } from 'shared/utils/dependencyInject'
import Symbols from 'dependency-type.config'

import Model from './model'
import View from './view'
import { EditorPlugin } from '../type'

@injectable()
class Text implements EditorPlugin {

	type = Symbols.Text
	view = View
	model = Model

}

export default Text
