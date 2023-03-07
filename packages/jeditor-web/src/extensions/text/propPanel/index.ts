import { h } from 'vue'

import Symbols from 'settings/dependency-type.config'

import FontBlock from './font'
import LayoutBlock from './layout'

import type { TextModelProps } from '../types'
import type { ElementModel, PropPanelPlugin, VNode } from 'shared/utils/type'

class TextPanel implements PropPanelPlugin {

	type = Symbols.Text
	editBlockPool: Map<string, VNode> = new Map()
	model: ElementModel<TextModelProps>

	constructor(initialModel: ElementModel<TextModelProps>) {
		this.model = initialModel
		// edit layout props()
		this.addEditBlock('layout', this.layoutBlock())
		// edit font props(font-size, font-family)
		this.addEditBlock('font', this.fontBlock())
		// add more block to edit element ...
	}

	layoutBlock(): VNode {
		return h(LayoutBlock, {
			text: this.model.props.text,
			onLayoutChange: newLayout => {
				newLayout
			},
		})
	}

	fontBlock(): VNode {
		return h(FontBlock, {
			onFontChange: newFont => {
				newFont
			},
		})
	}

	public addEditBlock(blockName: string, block: VNode): void {
		this.editBlockPool.set(blockName, block)
	}

}

export default TextPanel
