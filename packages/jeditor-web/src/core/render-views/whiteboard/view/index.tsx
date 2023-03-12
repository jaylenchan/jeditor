import { defineComponent, h, resolveComponent, reactive } from 'vue'

import ElementWrapper from 'core/render-views/whiteboard/view/ElementWrapper'
import SelectedElementWrapper from 'core/render-views/whiteboard/view/SelectedElementWrapper'
import { ee } from 'shared/utils/event'

import type BoardModel from '../model'
import type { ReactiveElementModel, VNode } from 'shared/utils/type'
import type { PropType } from 'vue'
import style from './index.module.scss'

const WhiteboardView = defineComponent({
	props: {
		model: {
			type: Object as PropType<BoardModel>,
			required: true,
		},
	},
	setup({ model }) {
		const elementModels = reactive<ReactiveElementModel[]>(model.elements)

		return (): VNode => (
			<div class={style.whiteboardContainer} id="whiteboard">
				{elementModels.map(model => {
					return (
						<SelectedElementWrapper model={model}>
							<ElementWrapper
								model={model}
								onSelected={(model: ReactiveElementModel): void => {
									ee.emit('elementSelected', model)
								}}
								key={model.id}
							>
								{h(resolveComponent(model.type.toString()), { model })}
							</ElementWrapper>
						</SelectedElementWrapper>
					)
				})}
			</div>
		)
	},
})

export default WhiteboardView

export type IWhiteboardView = typeof WhiteboardView
