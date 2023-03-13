import type {
	EditBlockGenerator,
	Layout,
	PropPanelPlugin,
	ReactiveElementModel,
	Size,
} from 'shared/utils/type'


export interface Font {
	size: number
	family: string
}

export interface TextModelProps {
	text: string
	layout: Layout
	font: Font
	size: Size
}

export type TextReactiveElementModel = ReactiveElementModel<TextModelProps>
export type TextEditBlockGenerator = EditBlockGenerator<TextModelProps>
export type TextPropPanelPlugin = PropPanelPlugin<TextModelProps>
