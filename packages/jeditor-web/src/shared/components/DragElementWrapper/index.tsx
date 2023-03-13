import { defineComponent, ref, watch } from 'vue'

import style from './index.module.scss'

import type { VNode } from 'shared/utils/type'


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
