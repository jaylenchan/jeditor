import Symbols from 'settings/dependency-type.config'
import { injectable } from 'shared/utils/dependencyInject'

import Model from './model'
import PropPanel from './propPanel'
import View from './view'
import { EditorPlugin } from '../type'

@injectable()
class Text implements EditorPlugin {

	type = Symbols.Text
	view = View
	model = Model
	propPanel = PropPanel

}

export default Text
