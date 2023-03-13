import Symbols from 'settings/dependency-type.config'
import { createIdentifier } from 'shared/utils/uuid'

import type { Font, TextReactiveElementModel } from '../types'
import type { Layout, Size } from 'shared/utils/type'


class Model implements TextReactiveElementModel {

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

export default Model
