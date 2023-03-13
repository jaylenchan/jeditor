import { h } from 'vue'

import Symbols from 'settings/dependency-type.config'

import FontBlock from './font'
import LayoutBlock from './layout'
import TextBlock from './text'

import type { TextModelProps } from '../types'
import type {
	EditBlockGenerator,
	ReactiveElementModel,
	PropPanelPlugin,
	VNode,
} from 'shared/utils/type'


type TextReactiveElementModel = ReactiveElementModel<TextModelProps>
type TextEditBlockGenerator = EditBlockGenerator<TextModelProps>

class TextPanel implements PropPanelPlugin<TextModelProps> {

	public readonly type = Symbols.Text
	private _editBlockGeneratorPool: Map<string, TextEditBlockGenerator> =
		new Map()

	constructor() {
		this._addEditBlock('text', this._textBlock)

		this._addEditBlock('font', this._fontBlock)

		this._addEditBlock('layout', this._layoutBlock)
	}

	public getEditBlockGenerators(): Map<string, TextEditBlockGenerator> {
		return this._editBlockGeneratorPool
	}

	private _addEditBlock(
		blockName: string,
		editBlockGenerator: TextEditBlockGenerator
	): void {
		this._editBlockGeneratorPool.set(blockName, editBlockGenerator)
	}

	private _textBlock(initialModel: TextReactiveElementModel): VNode {
		return h(TextBlock, { model: initialModel })
	}

	private _layoutBlock(initialModel: TextReactiveElementModel): VNode {
		return h(LayoutBlock, { model: initialModel })
	}

	private _fontBlock(initialModel: TextReactiveElementModel): VNode {
		return h(FontBlock, { model: initialModel })
	}

}

export default TextPanel
