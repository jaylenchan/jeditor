import Symbols from 'settings/dependency-type.config'
import { injectable } from 'shared/utils/dependencyInject'

import Model from './model'
import PropPanel from './propPanel'
import View from './view'

import type { TextModelProps } from './types'
import type { EditorPlugin } from 'shared/utils/type'

@injectable()
class Text implements EditorPlugin<TextModelProps> {

	type = Symbols.Text
	view = View
	model = Model
	propPanel = PropPanel

}

export default Text
