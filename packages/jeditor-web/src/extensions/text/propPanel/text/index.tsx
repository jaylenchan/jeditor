import { defineComponent } from 'vue'

import type { PropType } from 'vue'

const TextBlock = defineComponent({
	props: {
		onTextChange: {
			type: Function as PropType<(newText: string) => void>,
			required: true,
		},
	},
	setup({ onTextChange }) {
		return () => (
			<div
				onClick={() => {
					onTextChange('你看，这不就改变了元素的文本展示了吗？')
				}}
			>
				Text Edit Block
			</div>
		)
	},
})

export default TextBlock
