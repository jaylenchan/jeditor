import { defineComponent } from 'vue'

import style from './index.module.scss'

import type { VNode } from 'shared/utils/type'


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
