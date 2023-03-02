import {
	defineComponent,
	h,
	resolveComponent,
	PropType,
	watchEffect,
	reactive,
} from 'vue'
import style from './index.module.scss'
import Wrapper from 'common/wrapper'
import { ElementModel, TYPES } from 'core/type'
import container from 'src/dependency-inject.config'
import ModelService from 'core/modelService'
import { ee } from 'common/utils/event'

const WhiteboardView = defineComponent({
	props: {
		model: {
			type: Object as PropType<
				ElementModel & {
					elements: { type: string; props: { [k: string]: string } }[]
				}
			>,
			required: true,
		},
	},
	setup() {
		const elements = reactive<
			{ type: string; props: { [k: string]: string } }[]
		>([])
		watchEffect(() => {
			ee.on('modelChange', () => {
				console.log('Modelchange')
				const modelService = container.get<ModelService>(TYPES.ModelService)
				const id = modelService.getModelIds('Whiteboard')![0]
				const model = modelService.getModel('Whiteboard', id)
				elements.length = 0
				elements.push(...(model as any).elements)
				console.log('model', model)
			})
		})

		return () => (
			<div class={style.boardContainer}>
				{elements.map(el => {
					return (
						<Wrapper
							id={el.props.id}
							onSelected={id => {
								console.log('selectedId', id)
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
