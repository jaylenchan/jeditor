import { h } from 'vue'

import Symbols from 'settings/dependency-type.config'

import Font from './font'
import Layout from './layout'

import type {
	ElementModel,
	PropPanelPlugin,
	SetRefFunc,
	VNode,
} from 'shared/utils/type'

class TextPanel implements PropPanelPlugin {

	type = Symbols.Text
	editBlockPool: Map<string, VNode> = new Map()

	constructor(initialModel: ElementModel) {
		initialModel
		// edit layout props()
		this.addEditBlock('layout', this.layoutBlock())
		// edit font props(font-size, font-family)
		this.addEditBlock('font', this.fontBlock())
		// add more block to edit element ...
	}

	layoutBlock(): VNode {
		return h(Layout, {
			text: 'Layout',
			onModelChanged: (setText: SetRefFunc<number>) => {
				setText(2)
			},
		})
	}

	fontBlock(): VNode {
		return h(Font)
	}

	public addEditBlock(blockName: string, block: VNode): void {
		this.editBlockPool.set(blockName, block)
	}

}

export default TextPanel
