import { h } from 'vue'

import Symbols from 'settings/dependency-type.config'
import { useService } from 'shared/utils/service'

import FontBlock from './font'
import LayoutBlock from './layout'
import TextBlock from './text'

import type { TextModelProps } from '../types'
import type { ElementModel, PropPanelPlugin, VNode } from 'shared/utils/type'

class TextPanel implements PropPanelPlugin {

	type = Symbols.Text
	editBlockPool: Map<string, VNode> = new Map()
	model: ElementModel<TextModelProps>

	constructor(initialModel: ElementModel<TextModelProps>) {
		this.model = initialModel

		this.addEditBlock('text', this.textBlock())

		this.addEditBlock('font', this.fontBlock())

		this.addEditBlock('layout', this.layoutBlock())
	}

	textBlock(): VNode {
		return h(TextBlock, {
			text: this.model.props.text,
			onTextChange: newText => {
				this.model.props.text = newText
				const { boardService } = useService()
				boardService.updateElement(this.model)
			},
		})
	}

	layoutBlock(): VNode {
		return h(LayoutBlock, {
			text: this.model.props.text,
			onLayoutChange: newLayout => {
				this.model.props.layout = newLayout
				const { boardService } = useService()
				boardService.updateElement(this.model)
			},
		})
	}

	fontBlock(): VNode {
		return h(FontBlock, {
			onFontChange: newFont => {
				this.model.props.font = newFont
				const { boardService } = useService()
				boardService.updateElement(this.model)
			},
		})
	}

	public addEditBlock(blockName: string, block: VNode): void {
		this.editBlockPool.set(blockName, block)
	}

}

export default TextPanel
