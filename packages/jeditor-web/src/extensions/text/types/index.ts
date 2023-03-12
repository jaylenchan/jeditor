import type { Layout, Size } from 'shared/utils/type'

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
