import { h, ref, render } from 'vue'

import { VNode, RenderContainer } from './type'

import type { ElementModel } from 'shared/utils/type'
import type { Component, App, UnwrapRef, Ref } from 'vue'

interface RenderComponent {
	view: Component
	model: ElementModel
	app: App
}

export function createRenderVNode(renderCompoennt: RenderComponent): VNode {
	const { view, model, app } = renderCompoennt
	const renderNode = h(view, { model })
	renderNode.appContext = app._context

	return renderNode
}

export function renderVNode(renderNode: VNode, container: RenderContainer) {
	render(renderNode, container)
}

export function useRef<T>(
	value: T
): [Ref<UnwrapRef<T>>, (value: UnwrapRef<T>) => void] {
	const refObject = ref(value)
	const setRefObject = (value: UnwrapRef<T>) => {
		refObject.value = value
	}

	return [refObject, setRefObject]
}
