import Symbols from 'settings/dependency-type.config'
import { injectable } from 'shared/utils/dependencyInject'

import Model from './model'
import View from './view'

import type { BuiltInPlugin } from 'core/type'


@injectable()
class ToolPanel implements BuiltInPlugin {

	public type = Symbols.ToolPanel
	public model = Model
	public view = View

}

export default ToolPanel
