import { defineComponent } from 'vue'

import type { TextReactiveElementModel } from 'extensions/text/types'
import type { VNode } from 'shared/utils/type'
import type { PropType } from 'vue'


const fontOptions = [
	{
		label: 'cursive',
		value: 'cursive',
	},
	{
		label: 'fantasy',
		value: 'fantasy',
	},
	{
		label: 'emoji',
		value: 'emoji',
	},
	{
		label: 'math',
		value: 'math',
	},
]

export const FontFamily = defineComponent({
	props: {
		model: {
			type: Object as PropType<TextReactiveElementModel>,
			required: true,
		},
	},
	setup({ model }) {
		return (): VNode => {
			return (
				<el-select size="small" vModel={model.props.font.family}>
					{fontOptions.map(
						(font: { label: string; value: string }, index: number) => (
							<el-option value={font.value} key={index}>
								<div style={{ fontFamily: font.value }}>{font.label}</div>
							</el-option>
						)
					)}
				</el-select>
			)
		}
	},
})
