import { BoardElement, Border, Position } from 'common/elements/type'
import { createIdentifier } from 'common/utils/uuid'

class TextModel implements BoardElement {

	public readonly id: string
	public readonly type: string
	public position: Position
	public border: Border
	public opacity: number

	constructor() {
		this.id = createIdentifier()
		this.type = 'Text'
		this.position = {
			x: 0,
			y: 0,
		}
		this.border = {
			type: 'solid',
			color: '#000000',
			weight: 1,
			radius: 1,
		}
		this.opacity = 1
	}

}

export default new TextModel()
