import { defineComponent, ref, watch } from 'vue'

import { useDrag } from 'shared/utils/drag'

import type { ElementModel } from 'shared/utils/type'
import type { PropType } from 'vue'
import style from './index.module.scss'

const Wrapper = defineComponent({
	props: {
		model: {
			type: Object as PropType<ElementModel>,
		},
	},
	emits: ['selected'],
	setup({ model }, { slots, emit }) {
		const dragRef = ref<HTMLDivElement | null>(null)

		watch(dragRef, dom => {
			if (dom) {
				useDrag(dom)
			}
		})

		return () => {
			return (
				<div
					class={style.elementWrapper}
					ref={dragRef}
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
