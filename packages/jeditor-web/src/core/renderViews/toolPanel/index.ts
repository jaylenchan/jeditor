import Symbols from 'settings/dependency-type.config'
import { injectable } from 'shared/utils/dependencyInject'

import Model from './model'
import View from './view'

import type { BuiltInPlugin } from 'core/type'

@injectable()
class ToolPanel implements BuiltInPlugin {

	type = Symbols.ToolPanel
	model = Model
	view = View

}

export default ToolPanel
