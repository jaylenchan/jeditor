import { defineComponent } from 'vue'

import type { VNode } from 'shared/utils/type'
import style from './index.module.scss'

const EditBlockWrapper = defineComponent({
	props: {
		blockName: {
			type: String,
			required: true,
		},
	},
	setup({ blockName }, { slots }) {
		return (): VNode => (
			<div class={style.editBlockWrapper}>
				<div class={style.blockName}>{blockName}</div>
				{slots.default?.()}
			</div>
		)
	},
})

export default EditBlockWrapper
