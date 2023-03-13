import Symbols from 'settings/dependency-type.config'

import type {
	Layout,
	ReactiveElementModel,
	Size,
	VNode,
} from 'shared/utils/type'


class Model implements ReactiveElementModel {

	public id: string
	public type: symbol
	public props: { size: Size; layout: Layout }
	public tools: VNode[]

	constructor() {
		this.id = Symbols.ToolPanel.toString()
		this.type = Symbols.ToolPanel
		this.props = {
			size: {
				width: 0,
				height: 0,
			},
			layout: {
				x: 0,
				y: 0,
			},
		}
		this.tools = []
	}

}

export default Model
