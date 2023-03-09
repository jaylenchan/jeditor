import Symbols from 'settings/dependency-type.config'

import type { Border, ElementModel, Position, Size } from 'shared/utils/type'

class PropPanelModel implements ElementModel {

	public readonly id: string
	public readonly type: symbol
	public props: {
		position: Position
		border: Border
		opacity: number
		size: Size
	}

	constructor() {
		this.id = Symbols.PropPanel.toString()
		this.type = Symbols.PropPanel
		this.props = {
			position: {
				x: 0,
				y: 0,
			},
			border: {
				type: 'solid',
				color: '#000000',
				weight: 1,
				radius: 1,
			},
			opacity: 1,
			size: {
				width: 0,
				height: 0,
			},
		}
	}

}

export default PropPanelModel
