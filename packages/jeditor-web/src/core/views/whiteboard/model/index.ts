import Symbols from 'settings/dependency-type.config'

import type { Border, ElementModel, Position } from 'shared/utils/type'

class WhiteboardModel implements ElementModel {

	public readonly id: string
	public readonly type: symbol
	public elements: ElementModel[]
	public props: {
		position: Position
		border: Border
		opacity: number
		width: number
		height: number
	}

	constructor() {
		this.id = Symbols.Whiteboard.toString()
		this.type = Symbols.Whiteboard
		this.elements = []
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
			width: 900,
			height: 500,
		}
	}

}

export default WhiteboardModel
