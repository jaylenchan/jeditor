import { injectable } from 'shared/utils/dependencyInject'
import Symbols from 'dependency-type.config'

import Model from './model'
import View from './view'

import { EditorPlugin } from 'extensions/type'

@injectable()
class Whiteboard implements EditorPlugin {

	type = Symbols.Whiteboard
	view = View
	model = Model

}

export default Whiteboard
