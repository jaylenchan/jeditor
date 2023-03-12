import { defineComponent } from 'vue'

import EditBlockWrapper from 'shared/components/EditBlockWrapper'

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
		return (): VNode => (
			<EditBlockWrapper blockName="布局">
				<div class={style.layout}>
					{JSON.stringify(model.props.layout)}
					<el-input-number
						vModel={model.props.layout.x}
						size="small"
						controls-position="right"
						onChange={(newX: number): void => {
							model.props.layout.x = newX
						}}
					/>
					<el-input-number
						vModel={model.props.layout.y}
						size="small"
						controls-position="right"
						onChange={(newY: number): void => {
							model.props.layout.y = newY
						}}
					/>
				</div>
			</EditBlockWrapper>
		)
	},
})

export default LayoutBlock
