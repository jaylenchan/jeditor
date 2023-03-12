import { defineComponent, ref } from 'vue'

import type ToolPanelModel from '../model'
import type { VNode } from 'shared/utils/type'
import type { PropType } from 'vue'

const ToolPanelView = defineComponent({
	props: {
		model: {
			type: Object as PropType<ToolPanelModel>,
			required: true,
		},
	},
	setup({ model }) {
		const tools = ref(model.tools)

		return (): VNode => <div id="toolPanel">{tools.value}</div>
	},
})

export default ToolPanelView
