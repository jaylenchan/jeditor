import { h } from 'vue'

import Symbols from 'settings/dependency-type.config'

import FontBlock from './font'
import LayoutBlock from './layout'
import TextBlock from './text'

import type { TextModelProps } from '../types'
import type {
	ReactiveElementModel,
	PropPanelPlugin,
	VNode,
} from 'shared/utils/type'

class TextPanel implements PropPanelPlugin {

	type = Symbols.Text
	editBlockPool: Map<string, VNode> = new Map()
	model: ReactiveElementModel<TextModelProps>

	constructor(initialModel: ReactiveElementModel<TextModelProps>) {
		this.model = initialModel

		this.addEditBlock('text', this.textBlock())

		this.addEditBlock('font', this.fontBlock())

		this.addEditBlock('layout', this.layoutBlock())
	}

	textBlock(): VNode {
		return h(TextBlock, { model: this.model })
	}

	layoutBlock(): VNode {
		return h(LayoutBlock, { model: this.model })
	}

	fontBlock(): VNode {
		return h(FontBlock, {
			onFontChange: newFont => {
				this.model.props.font = newFont
			},
		})
	}

	public addEditBlock(blockName: string, block: VNode): void {
		this.editBlockPool.set(blockName, block)
	}

}

export default TextPanel
