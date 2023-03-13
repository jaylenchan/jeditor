import { defineComponent, ref } from 'vue'

import style from './index.module.scss'

import type ToolPanelModel from '../model'
import type { VNode } from 'shared/utils/type'
import type { PropType } from 'vue'

const View = defineComponent({
	props: {
		model: {
			type: Object as PropType<ToolPanelModel>,
			required: true,
		},
	},
	setup({ model }) {
		const tools = ref(model.tools)

		return (): VNode => (
			<div id="toolPanel" class={style.toolPanel}>
				{tools.value}
			</div>
		)
	},
})

export default View
