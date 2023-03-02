import View from './view'
import Model from './model'
import { injectable } from 'common/utils/dependencyInject'
import { EditorPlugin } from 'extensions/type'

@injectable()
class Whiteboard implements EditorPlugin {

	type = 'Whiteboard'
	view = View
	model = Model

}

export default Whiteboard
