import { defineComponent, ref } from 'vue'

import EditBlockWrapper from 'extensions/shared/propPanel/EditBlockWrapper'

import type { PropType } from 'vue'
import style from './index.module.scss'

const TextBlock = defineComponent({
	props: {
		text: {
			type: String,
			required: true,
		},
		onTextChange: {
			type: Function as PropType<(newText: string) => void>,
			required: true,
		},
	},
	setup({ text, onTextChange }) {
		const curText = ref(text)

		return () => (
			<EditBlockWrapper blockName="内容">
				<div>
					<el-input
						class={style.input}
						type="textarea"
						resize="none"
						vModel={curText.value}
						onInput={(newText: string) => {
							curText.value = newText
							onTextChange(newText)
						}}
					/>
				</div>
			</EditBlockWrapper>
		)
	},
})

export default TextBlock
