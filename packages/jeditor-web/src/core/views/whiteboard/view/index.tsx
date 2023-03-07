import {
	defineComponent,
	h,
	resolveComponent,
	watchEffect,
	reactive,
} from 'vue'

import BoardService from 'core/boardService'
import container from 'settings/dependency-inject.config'
import Symbols from 'settings/dependency-type.config'
import { ee } from 'shared/utils/event'
import Wrapper from 'shared/wrapper'

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
							model={el}
							onSelected={(model: ElementModel) => {
								ee.emit('elementSelected', model)
							}}
						>
							{h(resolveComponent(el.type.toString()), {
								...(el.props as object),
							})}
						</Wrapper>
					)
				})}
			</div>
		)
	},
})

export default WhiteboardView

export type IWhiteboardView = typeof WhiteboardView
