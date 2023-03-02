export interface Position {
	x: number
	y: number
}

export interface Border {
	type: string
	color: string
	weight: number
	radius: number
}

/** 面板元素 */
export interface BoardElement {
	readonly id: string
	readonly type: string
	position: Position
	border: Border
	opacity: number
}
