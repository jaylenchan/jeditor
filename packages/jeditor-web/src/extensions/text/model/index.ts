import { ElementModel, Border, Position } from 'core/type'
import { createIdentifier } from 'common/utils/uuid'

class TextModel implements ElementModel {

	public readonly id: string
	public readonly type: string
	public position: Position
	public border: Border
	public opacity: number
	public props: { text: string }

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
		this.props = {
			text: '我是一个快乐的文本元素~',
		}
	}

}

export default TextModel
