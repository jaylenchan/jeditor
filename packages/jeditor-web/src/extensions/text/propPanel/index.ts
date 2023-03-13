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

	public type = Symbols.Text
	public editBlockPool: Map<string, VNode> = new Map()
	public model: ReactiveElementModel<TextModelProps>

	constructor(initialModel: ReactiveElementModel<TextModelProps>) {
		this.model = initialModel

		this.addEditBlock('text', this.textBlock())

		this.addEditBlock('font', this.fontBlock())

		this.addEditBlock('layout', this.layoutBlock())
	}

	private addEditBlock(blockName: string, block: VNode): void {
		this.editBlockPool.set(blockName, block)
	}

	private textBlock(): VNode {
		return h(TextBlock, { model: this.model })
	}

	private layoutBlock(): VNode {
		return h(LayoutBlock, { model: this.model })
	}

	private fontBlock(): VNode {
		return h(FontBlock, { model: this.model })
	}

}

export default TextPanel
