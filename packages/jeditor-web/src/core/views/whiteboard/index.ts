import View from './view'
import { injectable } from 'inversify'
import { EditorPlugin } from '../../../extensions/type'

@injectable()
class Whiteboard implements EditorPlugin {

	type = 'Whiteboard'
	view = View

}

export default Whiteboard
