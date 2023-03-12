import { defineComponent } from 'vue'

import EditBlockWrapper from 'shared/components/EditBlockWrapper'
import { useRef } from 'shared/utils/render'

import type { ReactiveElementModel, VNode } from 'shared/utils/type'
import type { PropType } from 'vue'
import style from './index.module.scss'

const LayoutBlock = defineComponent({
	props: {
		model: {
			type: Object as PropType<ReactiveElementModel>,
			required: true,
		},
	},
	setup({ model }) {
		const [x, setX] = useRef(model.props.layout.x)
		const [y, setY] = useRef(model.props.layout.y)

		return (): VNode => (
			<EditBlockWrapper blockName="布局">
				<div class={style.layout}>
					{JSON.stringify(model.props.layout)}
					<el-input-number
						vModel={x.value}
						size="small"
						controls-position="right"
						onChange={(newX: number): void => {
							setX(newX)
							model.props.layout.x = newX
						}}
					/>
					<el-input-number
						vModel={y.value}
						size="small"
						controls-position="right"
						onChange={(newY: number): void => {
							setY(newY)
							model.props.layout.y = newY
						}}
					/>
				</div>
			</EditBlockWrapper>
		)
	},
})

export default LayoutBlock
