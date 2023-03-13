import Symbols from 'settings/dependency-type.config'
import { injectable } from 'shared/utils/dependencyInject'

import Model from './model'
import PropPanel from './propPanel'
import Trigger from './trigger'
import View from './view'

import type { TextModelProps } from './types'
import type { EditorPlugin } from 'shared/utils/type'


@injectable()
class TextPlugin implements EditorPlugin<TextModelProps> {

	public type = Symbols.Text
	public model = Model
	public view = View
	public propPanel = PropPanel
	public trigger = Trigger

}

export default TextPlugin
