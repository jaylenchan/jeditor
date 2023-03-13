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

	public readonly type = Symbols.Text
	private _editBlockPool: Map<string, VNode> = new Map()
	private _model: ReactiveElementModel<TextModelProps>

	constructor(initialModel: ReactiveElementModel<TextModelProps>) {
		this._model = initialModel

		this._addEditBlock('text', this._textBlock())

		this._addEditBlock('font', this._fontBlock())

		this._addEditBlock('layout', this._layoutBlock())
	}

	public getEditBlocks(): VNode[] {
		return Array.from(this._editBlockPool.values())
	}

	private _addEditBlock(blockName: string, block: VNode): void {
		this._editBlockPool.set(blockName, block)
	}

	private _textBlock(): VNode {
		return h(TextBlock, { model: this._model })
	}

	private _layoutBlock(): VNode {
		return h(LayoutBlock, { model: this._model })
	}

	private _fontBlock(): VNode {
		return h(FontBlock, { model: this._model })
	}

}

export default TextPanel
