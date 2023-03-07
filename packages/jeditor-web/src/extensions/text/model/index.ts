import Symbols from 'settings/dependency-type.config'
import { createIdentifier } from 'shared/utils/uuid'

import type { TextModelProps, Layout, Font } from '../types'
import type { ElementModel } from 'shared/utils/type'
class TextModel implements ElementModel<TextModelProps> {

	public readonly id: string
	public readonly type: symbol

	public props: {
		text: string
		layout: Layout
		font: Font
	}

	constructor() {
		this.id = createIdentifier()
		this.type = Symbols.Text
		this.props = {
			text: '我是一个快乐的文本元素~',
			layout: {
				x: 0,
				y: 0,
			},
			font: {
				size: 12,
				family: 'Courview',
			},
		}
	}

}

export default TextModel
