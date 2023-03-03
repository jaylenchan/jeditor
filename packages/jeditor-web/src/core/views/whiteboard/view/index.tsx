import {
	defineComponent,
	h,
	resolveComponent,
	PropType,
	watchEffect,
	reactive,
} from 'vue'

import { ee } from 'common/utils/event'
import Wrapper from 'common/wrapper'
import ModelService from 'core/modelService'
import BoardModel from 'core/views/whiteboard/model'
import container from 'src/dependency-inject.config'

import style from './index.module.scss'

import { ElementModel, TYPES } from 'core/type'

const WhiteboardView = defineComponent({
	props: {
		model: {
			type: Object as PropType<BoardModel>,
			required: true,
		},
	},
	setup() {
		const elements = reactive<ElementModel[]>([])

		watchEffect(() => {
			ee.on('modelChange', () => {
				const modelService = container.get<ModelService>(TYPES.ModelService)
				const boardModel = modelService.getBoardModel()
				if (boardModel) {
					elements.length = 0
					elements.push(...boardModel.elements)
				}
			})
		})

		return () => (
			<div class={style.boardContainer}>
				{elements.map(el => {
					return (
						<Wrapper
							id={el.id}
							onSelected={id => {
								id as string
							}}
						>
							{h(resolveComponent(el.type), { ...el.props })}
						</Wrapper>
					)
				})}
			</div>
		)
	},
})

export default WhiteboardView

export type IWhiteboardView = typeof WhiteboardView
