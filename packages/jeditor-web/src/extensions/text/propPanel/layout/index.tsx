import { defineComponent } from 'vue'

import EditBlockWrapper from 'extensions/shared/propPanel/EditBlockWrapper'

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
			<EditBlockWrapper blockName="布局">
				<div
					class={style.layout}
					onClick={() => onLayoutChange({ x: 10, y: 100 })}
				>
					{/* Layout Edit Block */}
				</div>
			</EditBlockWrapper>
		)
	},
})

export default LayoutBlock
