import Symbols from 'settings/dependency-type.config'
import { injectable } from 'shared/utils/dependencyInject'

import Model from './model'
import View from './view'

import type { BuiltInPlugin } from 'core/type'

@injectable()
class Whiteboard implements BuiltInPlugin {

	type = Symbols.Whiteboard
	model = Model
	view = View

}

export default Whiteboard
