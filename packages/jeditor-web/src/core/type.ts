export const TYPES = {
	PluginService: Symbol.for('PluginService'),
	BoardService: Symbol.for('BoardService'),
	ModelService: Symbol.for('ModelService'),
	AppContainer: Symbol.for('AppContainer'),
	JEditor: Symbol.for('JEditor'),
	Whiteboard: Symbol.for('Whiteboard'),
	Picture: Symbol.for('Picture'),
	Text: Symbol.for('Text'),
}

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
export interface ElementModel {
	readonly id: string
	readonly type: string
	position: Position
	border: Border
	opacity: number
}
