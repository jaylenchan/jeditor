import Symbols from 'settings/dependency-type.config'

import type { ReactiveElementModel, VNode } from 'shared/utils/type'

class ToolPanelModel implements ReactiveElementModel {

	id: string
	type: symbol
	props: { size: { width: number; height: number } }
	tools: VNode[]

	constructor() {
		this.id = Symbols.ToolPanel.toString()
		this.type = Symbols.ToolPanel
		this.props = {
			size: {
				width: 0,
				height: 0,
			},
		}
		this.tools = []
	}

}

export default ToolPanelModel
