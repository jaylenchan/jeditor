import { defineComponent } from 'vue'

import type { Layout } from 'extensions/text/types'
import type { PropType } from 'vue'
import style from './index.module.scss'

const LayoutBlock = defineComponent({
	props: {
		text: {
			type: String,
			required: true,
		},
		onLayoutChange: {
			type: Function as PropType<(newLayout: Layout) => void>,
			required: true,
		},
	},
	setup({ onLayoutChange }) {
		return () => (
			<div
				class={style.layout}
				onClick={() => onLayoutChange({ x: 10, y: 100 })}
			>
				Layout Edit Block
			</div>
		)
	},
})

export default LayoutBlock
