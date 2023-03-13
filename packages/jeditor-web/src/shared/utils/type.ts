import type { ReactiveObject } from 'core/reactivityService'
import type { h, render, UnwrapRef, Component } from 'vue'

/** 所有class通用的类型就是Class<T> */
export interface Class<T> extends Function {
	new (...args: unknown[]): T
}

export type VNode = ReturnType<typeof h>

export type RenderContainer = Parameters<typeof render>[1]

export type SetRefFunc<T> = (value: UnwrapRef<T>) => void

export interface Border {
	type: string
	color: string
	weight: number
	radius: number
}

export interface Size {
	width: number
	height: number
}

export interface Layout {
	x: number
	y: number
}

export interface ElementModel<T = unknown> {
	readonly id: string
	readonly type: symbol
	props: T & { size: Size; layout: Layout }
}

export interface ModelClass<T = unknown> extends Function {
	new (...args: unknown[]): ElementModel<T>
}

export interface PropPanelPlugin {
	type: symbol
	editBlockPool: Map<string, VNode>
}

export interface PropPanelClass<T = unknown> extends Function {
	new (initialModel: ElementModel<T>): PropPanelPlugin
}

export interface EditorPlugin<T = unknown> {
	type: symbol
	model: ModelClass
	view: Component // Note:目前没找到一个完美类型能够标注所有由defineComponent定义出来的组件，现在使用的这个类型除了字面上标注，实际上类型已经不安全了，这就又得在运行时做功夫检查
	propPanel: PropPanelClass<T>
	trigger: VNode
}

export type ReactiveElementModel<T = unknown> = ReactiveObject<ElementModel<T>>
