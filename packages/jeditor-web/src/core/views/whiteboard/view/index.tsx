import {
	defineComponent,
	h,
	resolveComponent,
	watchEffect,
	reactive,
	nextTick,
} from 'vue'

import ElementWrapper from 'shared/ElementWrapper'
import SelectedElementWrapper from 'shared/SelectedElementWrapper'
import { ee } from 'shared/utils/event'
import { useService } from 'shared/utils/service'

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
		const elements = reactive<ElementModel[]>(model.elements)

		function updateBoard() {
			const { boardService } = useService()
			const boardModel = boardService.getBoardModel()
			if (boardModel) {
				elements.length = 0
				nextTick(() => {
					elements.push(...boardModel.elements)
				})
			}
		}

		watchEffect(() => {
			ee.on('modelChange', () => {
				updateBoard()
			})
			ee.on('modelUpdate', () => {
				updateBoard()
			})
		})

		return () => (
			<div class={style.boardContainer} id="whiteboard">
				{elements.map(el => {
					return (
						<SelectedElementWrapper elementId={el.id}>
							<ElementWrapper
								model={el}
								onSelected={(model: ElementModel) => {
									ee.emit('elementSelected', model)
								}}
								key={el.id}
							>
								{h(resolveComponent(el.type.toString()), {
									model: el,
								})}
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
