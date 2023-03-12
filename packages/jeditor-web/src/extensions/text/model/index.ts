import Symbols from 'settings/dependency-type.config'
import { createIdentifier } from 'shared/utils/uuid'

import type { TextModelProps, Font } from '../types'
import type { Layout, ReactiveElementModel, Size } from 'shared/utils/type'
class TextModel implements ReactiveElementModel<TextModelProps> {

	public readonly id: string
	public readonly type: symbol

	public props: {
		text: string
		layout: Layout
		font: Font
		size: Size
	}

	constructor() {
		this.id = createIdentifier()
		this.type = Symbols.Text
		this.props = {
			text: '新建的文本元素' + Math.floor(10000 * Math.random()),
			layout: {
				x: 0,
				y: 0,
			},
			font: {
				size: 24,
				family: 'cursive',
			},
			size: {
				width: 0,
				height: 0,
			},
		}
	}

}

export default TextModel
