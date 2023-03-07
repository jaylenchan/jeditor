import { h, render } from 'vue'

import type { UnwrapRef } from 'vue'

/** 所有class通用的类型就是Class<T> */
export interface Class<T> extends Function {
	new (...args: unknown[]): T
}

export type VNode = ReturnType<typeof h>

export type RenderContainer = Parameters<typeof render>[1]

export type SetRefFunc<T> = (value: UnwrapRef<T>) => void

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

export interface ElementModel {
	readonly id: string
	readonly type: symbol
	props: {
		position?: Position
		border?: Border
		opacity?: number
		[k: string]: unknown
	}
}

export interface ModelClass extends Function {
	new (...args: unknown[]): ElementModel
}

export interface PropPanelPlugin {
	type: symbol
	editBlockPool: Map<string, VNode>
}

export interface PropPanelClass extends Function {
	new (initModel: ElementModel): PropPanelPlugin
}
