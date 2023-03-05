import Symbols from 'settings/dependency-type.config'
import { injectable } from 'shared/utils/dependencyInject'

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
