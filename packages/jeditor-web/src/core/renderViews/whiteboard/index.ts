import Symbols from 'settings/dependency-type.config'
import { injectable } from 'shared/utils/dependencyInject'

import WhiteboardModel from './model'
import WhiteboardView from './view'

import type { BuiltInPlugin } from 'core/type'

@injectable()
class Whiteboard implements BuiltInPlugin {

	type = Symbols.Whiteboard
	view = WhiteboardView
	model = WhiteboardModel

}

export default Whiteboard
