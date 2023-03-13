import { h, ref, render } from 'vue'

import type {
	VNode,
	RenderContainer,
	SetRefFunc,
	ReactiveElementModel,
} from './type'
import type { Component, App, UnwrapRef, Ref } from 'vue'


interface RenderComponent {
	view: Component
	model: ReactiveElementModel
	app: App
}

export function createRenderVNode(renderCompoennt: RenderComponent): VNode {
	const { view, model, app } = renderCompoennt
	const renderNode = h(view, { model })
	renderNode.appContext = app._context

	return renderNode
}

export function renderVNode(
	renderNode: VNode,
	container: RenderContainer
): void {
	render(renderNode, container)
}

export function useRef<T>(value: T): [Ref<UnwrapRef<T>>, SetRefFunc<T>] {
	const refObject = ref(value)
	const setRefObject: SetRefFunc<T> = (value: UnwrapRef<T>) => {
		refObject.value = value
	}

	return [refObject, setRefObject]
}
