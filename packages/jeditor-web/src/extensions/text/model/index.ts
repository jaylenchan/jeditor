import Symbols from 'settings/dependency-type.config'
import { createIdentifier } from 'shared/utils/uuid'

import type { TextModelProps } from '../types'
import type { ElementModel } from 'shared/utils/type'
class TextModel implements ElementModel<TextModelProps> {

	public readonly id: string
	public readonly type: symbol

	public props: {
		text: string
	}

	constructor() {
		this.id = createIdentifier()
		this.type = Symbols.Text
		this.props = {
			text: '我是一个快乐的文本元素~',
		}
	}

}

export default TextModel
