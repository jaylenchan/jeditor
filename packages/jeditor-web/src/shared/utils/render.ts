import { h, render } from 'vue'

import { VNode, RenderContainer } from './type'

import type { ElementModel } from 'shared/utils/type'
import type { Component, App } from 'vue'

interface RenderComponent {
	view: Component
	model: ElementModel
	app: App
}

export function generateRenderVNode(renderCompoennt: RenderComponent): VNode {
	const { view, model, app } = renderCompoennt
	const renderNode = h(view, { model })
	renderNode.appContext = app._context

	return renderNode
}

export function renderVNode(renderNode: VNode, container: RenderContainer) {
	render(renderNode, container)
}
