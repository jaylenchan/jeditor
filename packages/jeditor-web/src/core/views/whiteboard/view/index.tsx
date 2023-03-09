import {
	defineComponent,
	h,
	resolveComponent,
	watchEffect,
	reactive,
	nextTick,
} from 'vue'

import ElementWrapper from 'shared/ElementWrapper'
import SelectedEelemntWrapper from 'shared/SelectedElementWrapper'
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
	setup() {
		const elements = reactive<ElementModel[]>([])

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
			<div class={style.boardContainer}>
				{elements.map(el => {
					return (
						<ElementWrapper
							model={el}
							onSelected={(model: ElementModel) => {
								ee.emit('elementSelected', model)
							}}
							key={el.id}
						>
							<SelectedEelemntWrapper>
								{h(resolveComponent(el.type.toString()), {
									...(el.props as object),
								})}
							</SelectedEelemntWrapper>
						</ElementWrapper>
					)
				})}
			</div>
		)
	},
})

export default WhiteboardView

export type IWhiteboardView = typeof WhiteboardView
