import Symbols from 'settings/dependency-type.config'
import { injectable } from 'shared/utils/dependencyInject'

import Model from './model'
import View from './view'

import type { BuiltInPlugin } from 'core/type'


@injectable()
class PropPanel implements BuiltInPlugin {

	public type = Symbols.PropPanel
	public view = View
	public model = Model

}

export default PropPanel
