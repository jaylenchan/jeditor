import { defineComponent, ref, watch } from 'vue'

import type { VNode } from 'shared/utils/type'
import style from './index.module.scss'

const DragElementWrapper = defineComponent({
	setup(_, { slots }) {
		const dragRef = ref<HTMLDivElement | null>(null)

		watch(dragRef, dom => {
			if (dom) {
				// useDrag(dom)
				dom
			}
		})

		return (): VNode => (
			<div class={style.dragElementWrapper} ref={dragRef}>
				{slots.default?.()}
			</div>
		)
	},
})

export default DragElementWrapper
