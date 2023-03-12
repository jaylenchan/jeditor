import { defineComponent } from 'vue'

import EditBlockWrapper from 'shared/components/EditBlockWrapper'

import type { Layout } from 'extensions/text/types'
import type { VNode } from 'shared/utils/type'
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
		return (): VNode => (
			<EditBlockWrapper blockName="布局">
				<div
					class={style.layout}
					onClick={(): void => onLayoutChange({ x: 10, y: 100 })}
				>
					{/* Layout Edit Block */}
				</div>
			</EditBlockWrapper>
		)
	},
})

export default LayoutBlock
