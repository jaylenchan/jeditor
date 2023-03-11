import { defineComponent, h, resolveComponent, reactive } from 'vue'

import ElementWrapper from 'shared/ElementWrapper'
import SelectedElementWrapper from 'shared/SelectedElementWrapper'
import { ee } from 'shared/utils/event'

import type BoardModel from '../model'
import type { ElementModel } from 'shared/utils/type'
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
		const elementModels = reactive<ElementModel[]>(model.elements)

		return () => (
			<div class={style.boardContainer} id="whiteboard">
				{elementModels.map(model => {
					return (
						<SelectedElementWrapper model={model}>
							<ElementWrapper
								model={model}
								onSelected={(model: ElementModel) => {
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
