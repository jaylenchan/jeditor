import Symbols from 'settings/dependency-type.config'

import { ElementModel, Border, Position } from 'core/type'

class WhiteboardModel implements ElementModel {

	public readonly id: string
	public readonly type: symbol
	public elements: ElementModel[]
	public props: {
		position: Position
		border: Border
		opacity: number
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
		}
	}

}

export default WhiteboardModel
