import { defineComponent } from 'vue'

import type { ReactiveElementModel } from 'shared/utils/type'
import type { PropType } from 'vue'
import style from './index.module.scss'

const Wrapper = defineComponent({
	props: {
		model: {
			type: Object as PropType<ReactiveElementModel>,
		},
	},
	emits: ['selected'],
	setup({ model }, { slots, emit }) {
		return () => {
			return (
				<div
					class={style.elementWrapper}
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
