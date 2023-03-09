import { defineComponent } from 'vue'

import style from './index.module.scss'

const EditBlockWrapper = defineComponent({
	props: {
		blockName: {
			type: String,
			required: true,
		},
	},
	setup({ blockName }, { slots }) {
		return () => (
			<div class={style.editBlockWrapper}>
				<div class={style.blockName}>{blockName}</div>
				{slots.default?.()}
			</div>
		)
	},
})

export default EditBlockWrapper
