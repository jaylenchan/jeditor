import { injectable } from 'shared/utils/dependencyInject'

import Model from './model'
import View from './view'

import { EditorPlugin } from 'extensions/type'

@injectable()
class Whiteboard implements EditorPlugin {

	type = 'Whiteboard'
	view = View
	model = Model

}

export default Whiteboard
