import {
	defineComponent,
	h,
	resolveComponent,
	PropType,
	watchEffect,
	reactive,
} from 'vue'

import BoardService from 'core/boardService'
import { ee } from 'shared/utils/event'
import Wrapper from 'shared/wrapper'
import container from 'dependency-inject.config'
import Symbols from 'dependency-type.config'

import { ElementModel } from 'core/type'
import type BoardModel from 'core/views/whiteboard/model'
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

		watchEffect(() => {
			ee.on('modelChange', () => {
				const boardService = container.get<BoardService>(Symbols.BoardService)
				const boardModel = boardService.getBoardModel()
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
								id
							}}
						>
							{h(resolveComponent(el.type.toString()), { ...el.props })}
						</Wrapper>
					)
				})}
			</div>
		)
	},
})

export default WhiteboardView

export type IWhiteboardView = typeof WhiteboardView
