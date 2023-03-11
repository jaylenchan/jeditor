import { defineComponent, ref, watch } from 'vue'

import { useDrag } from 'shared/utils/drag'

import type { VNode } from 'shared/utils/type'
import style from './index.module.scss'

const DragElementWrapper = defineComponent({
	setup(_, { slots }) {
		const dragRef = ref<HTMLDivElement | null>(null)

		watch(dragRef, dom => {
			if (dom) {
				useDrag(dom)
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
