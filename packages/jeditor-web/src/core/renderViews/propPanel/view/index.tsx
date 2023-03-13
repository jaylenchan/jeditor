import { defineComponent } from 'vue'

import type PropPanelModel from '../model'
import type { VNode } from 'shared/utils/type'
import type { PropType } from 'vue'


const View = defineComponent({
	props: {
		model: {
			type: Object as PropType<PropPanelModel>,
			required: true,
		},
	},
	setup({ model }) {
		return (): VNode => <>{model.editBlocks}</>
	},
})

export default View
