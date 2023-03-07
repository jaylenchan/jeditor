import { defineComponent } from 'vue'

import type { ElementModel } from 'shared/utils/type'
import type { PropType } from 'vue'

const Wrapper = defineComponent({
	props: {
		model: {
			type: Object as PropType<ElementModel>,
		},
	},
	emits: ['selected'],
	setup({ model }, { slots, emit }) {
		return () => {
			return (
				<div
					id="element-wrapper"
					onClick={() => {
						emit('selected', model)
					}}
				>
					{slots.default && slots.default()}
				</div>
			)
		}
	},
})

export default Wrapper
