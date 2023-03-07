import { defineComponent } from 'vue'

import type { Font } from 'extensions/text/types'
import type { PropType } from 'vue'

const FontBlock = defineComponent({
	props: {
		onFontChange: {
			type: Function as PropType<(newFont: Font) => void>,
			required: true,
		},
	},
	setup({ onFontChange }) {
		return () => (
			<div
				onClick={() => {
					onFontChange({ size: 18, family: '正楷' })
				}}
			>
				Font Edit Block
			</div>
		)
	},
})

export default FontBlock
