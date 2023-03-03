import { createIdentifier } from 'common/utils/uuid'

import { ElementModel, Border, Position } from 'core/type'

class TextModel implements ElementModel {

	public readonly id: string
	public readonly type: string

	public props: {
		position: Position
		border: Border
		opacity: number
		text: string
	}

	constructor() {
		this.id = createIdentifier()
		this.type = 'Text'
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
			text: '我是一个快乐的文本元素~',
		}
	}

}

export default TextModel
