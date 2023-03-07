import { h } from 'vue'

import container from 'settings/dependency-inject.config'
import Symbols from 'settings/dependency-type.config'

import FontBlock from './font'
import LayoutBlock from './layout'
import TextBlock from './text'

import type { TextModelProps } from '../types'
import type BoardService from 'core/boardService'
import type { ElementModel, PropPanelPlugin, VNode } from 'shared/utils/type'

class TextPanel implements PropPanelPlugin {

	type = Symbols.Text
	editBlockPool: Map<string, VNode> = new Map()
	model: ElementModel<TextModelProps>

	constructor(initialModel: ElementModel<TextModelProps>) {
		this.model = initialModel
		// edit text
		this.addEditBlock('text', this.textBlock())
		// edit layout props()
		this.addEditBlock('layout', this.layoutBlock())
		// edit font props(font-size, font-family)
		this.addEditBlock('font', this.fontBlock())
		// add more block to edit element ...
	}

	textBlock(): VNode {
		return h(TextBlock, {
			onTextChange: newText => {
				this.model.props.text = newText
				const boardService = container.get<BoardService>(Symbols.BoardService)
				boardService.updateElement(this.model)
			},
		})
	}

	layoutBlock(): VNode {
		return h(LayoutBlock, {
			text: this.model.props.text,
			onLayoutChange: newLayout => {
				this.model.props.layout = newLayout
				const boardService = container.get<BoardService>(Symbols.BoardService)
				boardService.updateElement(this.model)
			},
		})
	}

	fontBlock(): VNode {
		return h(FontBlock, {
			onFontChange: newFont => {
				this.model.props.font = newFont
				const boardService = container.get<BoardService>(Symbols.BoardService)
				boardService.updateElement(this.model)
			},
		})
	}

	public addEditBlock(blockName: string, block: VNode): void {
		this.editBlockPool.set(blockName, block)
	}

}

export default TextPanel
