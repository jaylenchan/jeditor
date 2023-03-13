import { defineComponent } from 'vue'

import EditBlockWrapper from 'shared/components/EditBlockWrapper'

import style from './index.module.scss'

import type { ReactiveElementModel, VNode } from 'shared/utils/type'
import type { PropType } from 'vue'


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
					<el-input-number
						vModel={model.props.layout.x}
						size="small"
						controls-position="right"
					/>
					<el-input-number
						vModel={model.props.layout.y}
						size="small"
						controls-position="right"
					/>
				</div>
			</EditBlockWrapper>
		)
	},
})

export default LayoutBlock
