import type { Size } from 'shared/utils/type'

export interface Layout {
	x: number
	y: number
}

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
