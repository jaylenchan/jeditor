import { h } from 'vue'

import Symbols from 'settings/dependency-type.config'

import Font from './font'
import Layout from './layout'

import type { PropPanelPlugin, SetRefFunc, VNode } from 'shared/utils/type'

class TextPanel implements PropPanelPlugin {

	type = Symbols.Text
	editBlockPool: Map<string, VNode> = new Map()

	constructor() {
		this.addEditBlock('layout', this.layoutBlock())
		this.addEditBlock('font', this.fontBlock())
	}

	public addEditBlock(blockName: string, block: VNode): void {
		this.editBlockPool.set(blockName, block)
	}

	fontBlock(): VNode {
		return h(Font)
	}

	layoutBlock(): VNode {
		return h(Layout, {
			text: 'Layout',
			onModelChanged: (setText: SetRefFunc<number>) => {
				setText(2)
			},
		})
	}

}

export default TextPanel
