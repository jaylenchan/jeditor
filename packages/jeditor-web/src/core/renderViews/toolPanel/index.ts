import Symbols from 'settings/dependency-type.config'
import { injectable } from 'shared/utils/dependencyInject'

import ToolPanelModel from './model'
import ToolPanelView from './view'

import type { BuiltInPlugin } from 'core/type'

@injectable()
class ToolPanel implements BuiltInPlugin {

	type = Symbols.ToolPanel
	view = ToolPanelView
	model = ToolPanelModel

}

export default ToolPanel
